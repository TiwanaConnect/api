import { Injectable } from '@nestjs/common';
import * as geoip from 'geoip-lite';

@Injectable()
export class GeoService {
  getCountryFromIp(ip: string): string | null {
    // Handle IPv4-mapped IPv6 addresses
    if (ip.startsWith('::ffff:')) {
      ip = ip.substring(7);
    }

    if (this.isPrivateIp(ip)) {
      return null;
    }

    const geo = geoip.lookup(ip);
    return geo ? geo.country : null;
  }

  private isPrivateIp(ip: string): boolean {
    // Loopback addresses
    if (ip === '127.0.0.1' || ip === '::1') {
      return true;
    }

    // IPv4 private ranges
    if (
      ip.startsWith('10.') || // Class A private network
      ip.startsWith('192.168.') || // Class C private network
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip) || // Class B private network
      ip.startsWith('169.254.') // Link-local addresses
    ) {
      return true;
    }

    // IPv6 private ranges
    if (
      ip.startsWith('fc') ||
      ip.startsWith('fd') || // IPv6 unique local addresses (ULA)
      ip.startsWith('fe80:') // IPv6 link-local addresses
    ) {
      return true;
    }

    // Not a private IP
    return false;
  }
}
