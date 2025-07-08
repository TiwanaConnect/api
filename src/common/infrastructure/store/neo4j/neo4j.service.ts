import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Driver, Session, ManagedTransaction } from 'neo4j-driver';
import * as neo4j from 'neo4j-driver';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Neo4jService implements OnModuleInit, OnModuleDestroy {
  private driver!: Driver;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.driver = neo4j.driver(
      this.configService.get<string>('neo4j.uri') ?? '',
      neo4j.auth.basic(
        this.configService.get<string>('neo4j.username') ?? '',
        this.configService.get<string>('neo4j.password') ?? '',
      ),
    );

    // Verify connection
    try {
      await this.driver.verifyConnectivity();
      console.log('✅ Connected to Neo4j database');
    } catch (error) {
      console.error('❌ Failed to connect to Neo4j:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    if (this.driver) {
      await this.driver.close();
    }
  }

  getDriver(): Driver {
    return this.driver;
  }

  getSession(): Session {
    return this.driver.session();
  }

  async runQuery(
    query: string,
    parameters: Record<string, any> = {},
  ): Promise<any[]> {
    const session = this.getSession();
    try {
      const result = await session.run(query, parameters);
      return result.records.map((record) => record.toObject());
    } finally {
      await session.close();
    }
  }

  async runTransaction<T>(
    transactionFn: (tx: ManagedTransaction) => Promise<T>,
  ): Promise<T> {
    const session = this.getSession();
    try {
      return await session.executeWrite(transactionFn);
    } finally {
      await session.close();
    }
  }

  // Helper method to convert Neo4j records to plain objects
  private recordToObject(record: any): any {
    const obj: any = {};
    record.keys.forEach((key: string) => {
      const value = record.get(key);
      obj[key] = this.convertNeo4jValue(value);
    });
    return obj;
  }

  // Helper method to convert Neo4j values to JavaScript values
  private convertNeo4jValue(value: any): any {
    if (neo4j.isInt(value)) {
      return value.toNumber();
    }
    if (neo4j.isDate(value)) {
      return value.toStandardDate();
    }
    if (neo4j.isDateTime(value)) {
      return value.toStandardDate();
    }
    if (neo4j.isLocalDateTime(value)) {
      return value.toStandardDate();
    }
    if (neo4j.isTime(value)) {
      return value.toString();
    }
    if (neo4j.isLocalTime(value)) {
      return value.toString();
    }
    if (neo4j.isDuration(value)) {
      return value.toString();
    }
    if (neo4j.isPoint(value)) {
      return {
        x: value.x,
        y: value.y,
        z: value.z,
        srid: value.srid,
      };
    }
    return value;
  }
}
