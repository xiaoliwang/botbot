
import CDNClient from './cdn'
import config from '../config'

const SLB_API = 'https://slb.aliyuncs.com/'

export default class SLBClient extends CDNClient {
  constructor(conf) {
    super(conf)
    this.config = { ...this.config, ...config['slb'] }
    this.api = SLB_API
    this.version = '2014-05-15'
  }
  getRegions() {
    return this.request({
      Action: 'DescribeRegions',
    })
  }
  getLoadBalancers() {
    return this.request({
      Action: 'DescribeLoadBalancers',
      RegionId: this.config.regionId,
    })
  }
  getLoadBalancer(lb_id) {
    return this.request({
      Action: 'DescribeLoadBalancerAttribute',
      LoadBalancerId: lb_id,
    })
  }
  getLoadBalancerAttribute(lb_id, protocal, port) {
    return this.request({
      Action: 'DescribeLoadBalancer' + protocal.toUpperCase() + 'ListenerAttribute',
      LoadBalancerId: lb_id,
      ListenerPort: port,
    })
  }
  uploadCertificate(name, pubkey, privkey) {
    return this.request({
      Action: 'UploadServerCertificate',
      RegionId: this.config.regionId,
      ServerCertificateName: name,
      ServerCertificate: pubkey,
      PrivateKey: privkey,
    })
  }
  setCertificateName(certificate_id, name) {
    return this.request({
      Action: 'SetServerCertificateName',
      ServerCertificateId: certificate_id,
      RegionId: this.config.regionId,
      ServerCertificateName: name,
    })
  }
  setLoadBalancerAttribute(lb_id, protocal, port, opts) {
    return this.request({
      Action: 'SetLoadBalancer' + protocal.toUpperCase() + 'ListenerAttribute',
      LoadBalancerId: lb_id,
      ListenerPort: port || 443,
      ...opts
    })
  }
}
