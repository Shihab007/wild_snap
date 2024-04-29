import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AssetByOidRequest } from '../../request/asset/asset-by-oid-request';
import { AssetDetailByOidRequest } from '../../request/asset/asset-detail-by-oid-request';
import { AssetDetailListRequest } from '../../request/asset/asset-detail-list-request';
import { AssetDetailSaveRequest } from '../../request/asset/asset-detail-save-request';
import { AssetListRequest } from '../../request/asset/asset-list-request';
import { AssetSaveRequest } from '../../request/asset/asset-save-request';

import { GetAssetAllocationByOidRequest } from '../../request/asset/get-asset-allocation-by-oid-request';
import { GetAssetAllocationListRequest } from '../../request/asset/get-asset-allocation-list-request';
import { GetAssetIncomeByOidRequest } from '../../request/asset/get-asset-income-by-oid-request';
import { GetAssetIncomeListRequest } from '../../request/asset/get-asset-income-list-request';
import { SaveAssetAllocationRequest } from '../../request/asset/save-asset-allocation-request';
import { AssetByOidResponse } from '../../response/asset/asset-by-oid-response';
import { AssetDetailByOidResponse } from '../../response/asset/asset-detail-by-oid-response';
import { SaveAssetIncomeRequest } from '../../request/asset/save-asset-income-request';
import { AssetDetailListResponse } from '../../response/asset/asset-detail-list-response';
import { AssetDetailSaveResponse } from '../../response/asset/asset-detail-save-response';
import { AssetListResponse } from '../../response/asset/asset-list-response';
import { AssetSaveResponse } from '../../response/asset/asset-save-response';
import { GetAssetAllocationByOidResponse } from '../../response/asset/get-asset-allocation-by-oid-response';
import { GetAssetAllocationListResponse } from '../../response/asset/get-asset-allocation-list-response';
import { GetAssetIncomeByOidResponse } from '../../response/asset/get-asset-income-by-oid-response';
import { GetAssetIncomeListResponse } from '../../response/asset/get-asset-income-list-response';
import { SaveAssetAllocationResponse } from '../../response/asset/save-asset-allocation-response';
import { SaveAssetIncomeResponse } from '../../response/asset/save-asset-income-response';
import { GetAssetIncomeCollectionListRequest } from '../../request/asset/get-asset-income-collection-list-request';
import { SaveAssetIncomeCollectionRequest } from '../../request/asset/save-asset-income-collection-request';
import { GetAssetIncomeCollectionByOidRequest } from '../../request/asset/get-asset-income-collection-by-oid-request';
import { GetAssetIncomeCollectionListResponse } from '../../response/asset/get-asset-income-collection-list-response';
import { SaveAssetIncomeCollectionResponse } from '../../response/asset/save-asset-income-collection-response';
import { GetAssetIncomeCollectionByOidResponse } from '../../response/asset/get-asset-income-collection-by-oid-response';
import { GetAssetIncomeCollectionByAssetRequest } from '../../request/asset/get-asset-income-collection-by-asset-request';
import { GetAssetIncomeCollectionByAssetResponse } from '../../response/asset/get-asset-income-collection-by-asset-response';
import { GetAssetIncomeCollectionByAssetHolderResponse } from '../../response/asset/get-asset-income-collection-by-asset-holder-response';
import { GetAssetIncomeCollectionByAssetHolderRequest } from '../../request/asset/get-asset-income-collection-by-asset-holder-request';
import { GetAssetIncomeCollectionByAllAssetResponse } from '../../response/asset/get-asset-income-collection-by-all-asset-response';
import { GetAssetHolderByAssetDetailsOidRequest } from '../../request/asset/get-asset-holder-by-asset-details-oid-request';
import { GetAssetHolderByAssetDetailsOidResponse } from '../../response/asset/get-asset-holder-by-asset-details-oid-response';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private httpClient: HttpClient) { }


  // Asset Service API

  getAssetList(assetListRequest: AssetListRequest): Observable<AssetListResponse> {
    return this.httpClient.post<AssetListResponse>(
      `${environment.baseURL}${environment.GET_ASSET_LIST}`, assetListRequest);
  }

  saveAsset(assetSaveRequest: AssetSaveRequest): Observable<AssetSaveResponse> {
    return this.httpClient.post<AssetSaveResponse>(
      `${environment.baseURL}${environment.SAVE_ASSET}`, assetSaveRequest);
  }

  getAssetByOid(assetDetailListRequest: AssetByOidRequest): Observable<AssetByOidResponse> {
    return this.httpClient.post<AssetByOidResponse>(
      `${environment.baseURL}${environment.GET_ASSET_BY_OID}`, assetDetailListRequest);
  }

  updateAsset(assetSaveRequest: AssetSaveRequest): Observable<AssetSaveResponse> {
    return this.httpClient.post<AssetSaveResponse>(
      `${environment.baseURL}${environment.UPDATE_ASSET}`, assetSaveRequest);
  }

  // Asset Detail Service API

  getAssetDetailList(assetDetailListRequest: AssetDetailListRequest): Observable<AssetDetailListResponse> {
    return this.httpClient.post<AssetDetailListResponse>(
      `${environment.baseURL}${environment.GET_ASSET_DETAIL_LIST}`, assetDetailListRequest);

  }

  saveAssetDetail(assetDetailSaveRequest: AssetDetailSaveRequest): Observable<AssetDetailSaveResponse> {
    return this.httpClient.post<AssetDetailSaveResponse>(
      `${environment.baseURL}${environment.SAVE_ASSET_DETAIL}`, assetDetailSaveRequest);
  }

  getAssetDetailByOid(assetDetailListRequest: AssetDetailByOidRequest): Observable<AssetDetailByOidResponse> {
    return this.httpClient.post<AssetDetailByOidResponse>(
      `${environment.baseURL}${environment.GET_ASSET_DETAIL_BY_OID}`, assetDetailListRequest);

  }
  updateAssetDetail(assetDetailSaveRequest: AssetDetailSaveRequest): Observable<AssetDetailSaveResponse> {
    return this.httpClient.post<AssetDetailSaveResponse>(
      `${environment.baseURL}${environment.UPDATE_ASSET_DETAIL}`, assetDetailSaveRequest);
  }

  // Asset Allocation Service API

  getAssetAllocationList(assetAllocationListRequest: GetAssetAllocationListRequest): Observable<GetAssetAllocationListResponse> {
    return this.httpClient.post<GetAssetAllocationListResponse>(
      `${environment.baseURL}${environment.GET_ASSET_ALLOCATION_LIST}`, assetAllocationListRequest);
  }

  saveAssetAllocation(saveAssetAllocationRequest: SaveAssetAllocationRequest): Observable<SaveAssetAllocationResponse> {
    return this.httpClient.post<SaveAssetAllocationResponse>(
      `${environment.baseURL}${environment.SAVE_ASSET_ALLOCATION}`, saveAssetAllocationRequest);
  }


  updateAssetAllocation(updateAssetAllocationRequest: SaveAssetAllocationRequest): Observable<SaveAssetAllocationResponse> {
    return this.httpClient.post<SaveAssetAllocationResponse>(
      `${environment.baseURL}${environment.UPDATE_ASSET_ALLOCATION}`, updateAssetAllocationRequest);
  }


  getAssetAllocationByOid(getAssetAllocationByOidRequest: GetAssetAllocationByOidRequest): Observable<GetAssetAllocationByOidResponse> {
    return this.httpClient.post<GetAssetAllocationByOidResponse>(
      `${environment.baseURL}${environment.GET_ASSET_ALLOCATION_BY_OID}`, getAssetAllocationByOidRequest);
  }


  // Asset Income Service API

  getAssetIncomeList(assetIncomeListRequest: GetAssetIncomeListRequest): Observable<GetAssetIncomeListResponse> {
    return this.httpClient.post<GetAssetIncomeListResponse>(
      `${environment.baseURL}${environment.GET_ASSET_INCOME_LIST}`, assetIncomeListRequest);
  }

  getAssetDueIncomeList(assetDueIncomeListRequest: GetAssetIncomeListRequest): Observable<GetAssetIncomeListResponse> {
    return this.httpClient.post<GetAssetIncomeListResponse>(
      `${environment.baseURL}${environment.SAVE_ASSET_DUE_INCOME_LIST}`, assetDueIncomeListRequest);
  }

  saveAssetIncome(saveAssetIncomeRequest: SaveAssetIncomeRequest): Observable<SaveAssetIncomeResponse> {
    return this.httpClient.post<SaveAssetIncomeResponse>(
      `${environment.baseURL}${environment.SAVE_ASSET_INCOME}`, saveAssetIncomeRequest);
  }


  updateAssetIncome(updateAssetIncomeRequest: SaveAssetIncomeRequest): Observable<SaveAssetIncomeResponse> {
    return this.httpClient.post<SaveAssetIncomeResponse>(
      `${environment.baseURL}${environment.UPDATE_ASSET_INCOME}`, updateAssetIncomeRequest);
  }


  getAssetIncomeByOid(getAssetIncomeByOidRequest: GetAssetIncomeByOidRequest): Observable<GetAssetIncomeByOidResponse> {
    return this.httpClient.post<GetAssetIncomeByOidResponse>(
      `${environment.baseURL}${environment.GET_ASSET_INCOME_BY_OID}`, getAssetIncomeByOidRequest);
  }

  getAssetHolderByAssetDetailsOid(getAssetHolderByAssetDetailsOidRequest: GetAssetHolderByAssetDetailsOidRequest): Observable<GetAssetHolderByAssetDetailsOidResponse> {
    return this.httpClient.post<GetAssetHolderByAssetDetailsOidResponse>(
      `${environment.baseURL}${environment.GET_ASSET_HOLDER_BY_ASSET_DETAILS_OID}`, getAssetHolderByAssetDetailsOidRequest);
  }





  // Asset Income Collection Service API

  getAssetIncomeCollectionList(assetIncomeCollectionListRequest: GetAssetIncomeCollectionListRequest): Observable<GetAssetIncomeCollectionListResponse> {
    return this.httpClient.post<GetAssetIncomeCollectionListResponse>(
      `${environment.baseURL}${environment.GET_ASSET_INCOME_COLLECTION_LIST}`, assetIncomeCollectionListRequest);
  }


  getAssetIncomeCollectionListByAllAsset(assetIncomeCollectionListRequest: GetAssetIncomeCollectionListRequest): Observable<GetAssetIncomeCollectionByAllAssetResponse> {
    return this.httpClient.post<GetAssetIncomeCollectionByAllAssetResponse>(
      `${environment.baseURL}${environment.GET_INCOME_COLLECTION_LIST_BY_ALL_ASSET}`, assetIncomeCollectionListRequest);
  }



  saveAssetIncomeCollection(saveAssetIncomeCollectionRequest: SaveAssetIncomeCollectionRequest): Observable<SaveAssetIncomeCollectionResponse> {
    return this.httpClient.post<SaveAssetIncomeCollectionResponse>(
      `${environment.baseURL}${environment.SAVE_ASSET_INCOME_COLLECTION}`, saveAssetIncomeCollectionRequest);
  }


  updateAssetIncomeCollection(updateAssetIncomeCollectionRequest: SaveAssetIncomeCollectionRequest): Observable<SaveAssetIncomeCollectionResponse> {
    return this.httpClient.post<SaveAssetIncomeCollectionResponse>(
      `${environment.baseURL}${environment.UPDATE_ASSET_INCOME_COLLECTION}`, updateAssetIncomeCollectionRequest);
  }


  getAssetIncomeCollectionByOid(getAssetIncomeCollectionByOidRequest: GetAssetIncomeCollectionByOidRequest): Observable<GetAssetIncomeCollectionByOidResponse> {
    return this.httpClient.post<GetAssetIncomeCollectionByOidResponse>(
      `${environment.baseURL}${environment.GET_ASSET_INCOME_COLLECTION_BY_OID}`, getAssetIncomeCollectionByOidRequest);
  }

  getAssetIncomeCollectionByAsset(getAssetIncomeCollectionByAssetRequest: GetAssetIncomeCollectionByAssetRequest): Observable<GetAssetIncomeCollectionByAssetResponse> {
    return this.httpClient.post<GetAssetIncomeCollectionByAssetResponse>(
      `${environment.baseURL}${environment.GET_INCOME_COLLECTION_BY_ASSET}`, getAssetIncomeCollectionByAssetRequest);
  }

  getAssetIncomeCollectionByAssetHolder(getAssetIncomeCollectionByAssetHolderRequest: GetAssetIncomeCollectionByAssetHolderRequest): Observable<GetAssetIncomeCollectionByAssetHolderResponse> {
    return this.httpClient.post<GetAssetIncomeCollectionByAssetHolderResponse>(
      `${environment.baseURL}${environment.GET_INCOME_COLLECTION_BY_ASSET_HOLDER}`, getAssetIncomeCollectionByAssetHolderRequest);
  }

  getAssetIncomeCollectionDetailByAssetHolder(getAssetIncomeCollectionDetailByAssetHolderRequest: GetAssetIncomeCollectionByAssetHolderRequest): Observable<GetAssetIncomeCollectionByAssetHolderResponse> {
    return this.httpClient.post<GetAssetIncomeCollectionByAssetHolderResponse>(
      `${environment.baseURL}${environment.GET_INCOME_COLLECTION_DETAIL_BY_ASSET_HOLDER}`, getAssetIncomeCollectionDetailByAssetHolderRequest);
  }


}
