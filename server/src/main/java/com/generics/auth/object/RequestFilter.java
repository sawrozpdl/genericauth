package com.generics.auth.object;

public class RequestFilter {

    public Integer page;
    public Integer size;
    public String search;
    public String sort;
    public Boolean active;

    public RequestFilter(Integer page, Integer size, String search, String sort, boolean active) {
        this.page = page;
        this.size = size;
        this.search = search;
        this.sort = sort;
        this.active = active;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
