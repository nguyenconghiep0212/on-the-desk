import http from 'helper/request'

export function fetchPackageList() {
    return http({
      method: 'get',
      url: `/api/packages/list`,
    },
  
    )
  }
  