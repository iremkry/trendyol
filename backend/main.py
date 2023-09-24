from enum import Enum
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from pymongo import MongoClient
from datetime import datetime
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  
    allow_headers=["*"], 
)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["network_assets"]

class ScanStatus(str, Enum):
    done = "done"
    active = "active"

class ScanOptions(str, Enum):
    fast_port_scan = "fast port scan"
    full_port_scan = "full port scan"
    script_based_scan = "script based scan"

class Asset(BaseModel):
    hostname: str
    ip_address: str
    os: str
    mac_address: str
    first_seen: str
    last_seen: str
    additional_details: str

class AssetDetails(BaseModel):
    hostname: str
    ip_address: str
    os: str
    mac_address: str
    first_seen: str
    last_seen: str
    additional_details: str    

# Model for the request
class ScanRequest(BaseModel):
    scan_name: str
    scope: str
    options: ScanOptions

# Model for the response
class ScanResponse(BaseModel):
    scan_name: str
    scope: str
    created_at: datetime
    finished_at: datetime
    options: ScanOptions
    status: ScanStatus

# API endpoints
@app.post("/assets/")
async def create_asset(asset: Asset):
    collection = db["assets"]
    result = collection.insert_one(asset.dict())
    return {"status": "Asset created", "id": str(result.inserted_id)}

@app.get("/assets/")
async def get_assets():
    collection = db["assets"]
    assets = []
    for document in collection.find():
        asset = Asset(**document)
        assets.append(asset)
    return assets


@app.get("/asset_details/{ip_address}", response_model=AssetDetails)
async def get_asset_details(ip_address: str):
    collection = db["assets"]
    asset = collection.find_one({"ip_address": ip_address})
    if asset:
        return asset
    return {"error": "Asset not found"}

@app.get("/assets/search/")
async def search_assets(query: str):
    collection = db["assets"]
    assets = []
    for document in collection.find({"name": {"$regex": query, "$options": "i"}}):
        asset = Asset(**document)
        assets.append(asset)
    return assets

from datetime import datetime


@app.post("/scans/")
async def create_scan(scan_data: ScanRequest):
    collection = db["scans"]
    current_time = datetime.now()
    scan_document = {
        "scan_name": scan_data.scan_name,
        "scope": scan_data.scope,
        "options": scan_data.options,
        "created_at": current_time,
        "finished_at": current_time,  # Assuming the scan finishes instantly
        "status": ScanStatus.active,
    }

    result = collection.insert_one(scan_document)

    inserted_document = collection.find_one({"_id": result.inserted_id})

    scan_record = ScanResponse(**inserted_document)

    return scan_record


@app.get("/scans/")
async def list_scans():
    collection = db["scans"]
    scan_records = list(collection.find({}))

    scan_records = [ScanResponse(**record) for record in scan_records]

    return scan_records

