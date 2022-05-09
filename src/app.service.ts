import { Injectable, OnModuleInit } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { Producer } from 'kafkajs';
import {v4 as uuid} from 'uuid'


@Injectable()
export class AppService implements OnModuleInit {

  private kafkaProducer: Producer;

  constructor(@InjectModel() private readonly knex: Knex,
  ) { }

  async onModuleInit() {
  }


  async produceEvents(){

    for(var i = 3000; i <= 5000; i++){
    console.log(i);
    var sql = `INSERT INTO vipcommerce_release.oferta_produtos(id, oferta_id, produto_id, produto_oferta, quantidade_minima, quantidade_maxima, quantidade_pagar, desconto, preco, valor, quantidade_brinde, maximo_produto_desconto, minimo_produto_desconto, modified, created)` +
     `VALUES('${uuid()}', 146, ${i}, NULL, 2, 7, 1, NULL, 9.49, 6.99, NULL, NULL, NULL, '2022-05-06 12:45:28', '2022-05-06 12:45:28');`

      await this.knex.raw(sql);
    }
  }

  // async produceEvents() {
  //   const capacidade = await this.knex.table<ProdutosDto>('view_acl_capacidades');

  //   // // const prod = Object.assign(new Array<ProdutosDto>(), produtos);


  //   for (let i = 0; i < 30001; i++) {

  //     var produto = {
  //       sku: i.toString(),
  //       nome: 'produtoxyz',
  //       produtoId: i.toString()
  //     }

  //     var message: TopicMessages = {
  //       topic: "produto-alterado",
  //       messages: [
  //         {
  //           value: JSON.stringify({ evento: JSON.stringify(produto) }),
  //           key: produto.sku.toString()
  //         }
  //       ]
  //     };

  //     events.push(message);
  //   }


  //   await this.kafkaProducer.sendBatch({
  //     topicMessages: events
    //  });
  }

