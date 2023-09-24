import http from 'helper/request'

export function fetchLandingData(params) {
    return http({
      method: 'post',
      url: `/cats/list`,
      data: params
    },
  
    )
  }
  