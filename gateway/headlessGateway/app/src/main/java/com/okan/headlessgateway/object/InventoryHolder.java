package com.okan.headlessgateway.object;

import java.util.ArrayList;
import java.util.List;

public class InventoryHolder {

    private String nodeId;
    private String nodeType;
    private String uniqueId;
    private List<ThingHolder> things = new ArrayList<>();

    public InventoryHolder() {
    }

    public List<ThingHolder> getThings() {
        return things;
    }

    public void setThings(List<ThingHolder> things) {
        this.things = things;
    }

    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId;
    }


    public String getNodeType() {
        return nodeType;
    }

    public void setNodeType(String nodeType) {
        this.nodeType = nodeType;
    }

    public String getUniqueId() {
        return uniqueId;
    }

    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }


}
