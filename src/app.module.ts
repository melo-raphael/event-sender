import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KnexModule } from 'nest-knexjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'mysql',
        version: '5.7',
        useNullAsDefault: true,
        connection: {
          host: 'localhost',
          port: 3320,
          user: 'raphaelmelo',
          password: 'polivel12',
          database: 'vipcommerce_release',
        },
      },
    }),
    ClientsModule.register([
      {
        name: 'kafka',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka-0.kafka.kafka-ca1.svc.cluster.local:9092','kafka-1.kafka.kafka-ca1.svc.cluster.local:9092','kafka-2.kafka.kafka-ca1.svc.cluster.local:9092']
          },
          consumer: {
            groupId: 'produto-alterado-grupo',
          },
        },
      },
    ]),
   ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
