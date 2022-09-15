import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { response } from 'express';

describe('Testes do Módulo de Tarefa (e2e)', () => {
  
  let app: INestApplication;

  let tarefaId : number

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '12345',
            database: 'db_todolisttest',
            autoLoadEntities: true,
            synchronize: true,
            logging: false,
            dropSchema: true
          }),
          AppModule
        ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    
  });

  it('Inserir tarefa no banco de dados', async() => {
    let response = await request(app.getHttpServer())
    .post('/tarefa')
    .send({
      nome : 'Tarefa 1',
      descricao : 'Tarefa 1 teste post',
      responsavel : 'Gabriela',
      data : '2022-09-15',
      status : true
    })
    .expect(201)

    tarefaId = response.body.id

  });

  it('Recuperar tarefa específica', async() => {
    return request(app.getHttpServer())
    .get(`/tarefa/${tarefaId}`)
    .expect(200)
  })

  it('Atualizar uma tarefa', async() => {
    return request(app.getHttpServer())
    .put('/tarefa')
    .send({
      id : 1,
      nome : 'Tarefa 1',
      descricao : 'Tarefa 1 atualizada',
      responsavel : 'Gabriela',
      data : '2022-09-15',
      status : true
    })
    .expect(200)
    .then(response => {
      expect ('Tarefa 1 atualizada').toEqual(response.body.descricao)
      })
    })

    it('Tarefa inexistente não pode ser atualizada', async() => {
      return request(app.getHttpServer())
      .put('/tarefa')
      .send({
        id : 99999,
        nome : 'Tarefa inexistente',
        descricao : 'Tarefa inexistente',
        responsavel : 'Gabriela',
        data : '2022-09-15',
        status : true
      })
      .expect(404)
      })
    

    afterAll(async() => {
    await app.close()
    })

})
