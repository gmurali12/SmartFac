package com.mindmax.smart.vo;

import java.util.List;

public class AssetVO {

	private String assetId = null;
	private String tenantId = null;
	private String name = null;

	private String parentId = null;
	private String typeId = null;

	private List<Object> aspects = null;

	public String getAssetId() {
		return assetId;
	}

	public void setAssetId(String assetId) {
		this.assetId = assetId;
	}

	public String getTenantId() {
		return tenantId;
	}

	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public String getTypeId() {
		return typeId;
	}

	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}

	public List<Object> getAspectList() {
		return aspects;
	}

	public void setAspectList(List<Object> aspectList) {
		this.aspects = aspectList;
	}

}
