![Tech Challenge Delivery System](assets\core\delivery_system-banner.jpeg)

# Tech-Challenge - Delivery System

## Introdução

No coração de um bairro em crescimento, uma lanchonete local está passando por uma significativa expansão devido ao seu sucesso. 
Porém, com esse crescimento vem o desafio de manter a eficiência e organização no atendimento aos clientes. Sem um sistema adequado de gerenciamento de pedidos, o serviço ao cliente pode se tornar caótico e confuso. Considerando um cliente que faz um pedido de um hambúrguer personalizado com ingredientes específicos, acompanhado de batatas fritas e uma bebida. O pedido pode ser anotado à mão e passado para a cozinha, mas não há garantia de que será preparado corretamente.

A ausência de um sistema de gerenciamento de pedidos pode levar a confusão entre a equipe e a cozinha, resultando em atrasos e na preparação incorreta dos pedidos. Os pedidos podem se perder, ser mal interpretados ou esquecidos, levando à insatisfação dos clientes e potencial perda de negócios.

Para enfrentar esses desafios, a lanchonete está investindo em um sistema de autoatendimento para fast-food. 
Este sistema é composto por uma série de dispositivos e interfaces que permitem aos clientes selecionar e fazer pedidos sem a necessidade de interagir com um atendente, garantindo um serviço eficiente e eficaz ao cliente, enquanto gerencia pedidos e estoques de forma adequada, e resolver o problema com desde o design a implementação do sistema, a lanchonete chamou os especialistas em Arquitetura de Software do Grupo 22.

## Funcionalidades

- **Gerenciar Clientes**: Os clientes podem se registrar com seu nome, e-mail e CPF no início de um pedido ou optar por permanecer não identificados.
- **Gerenciar Produtos**: Os produtos podem ser cadastrados com um nome, categoria, preço, descrição e imagens. As categorias de produtos incluem:
  - Lanches
  - Acompanhamentos
  - Bebidas
  - Sobremesas
- **Pagamento**: Integração com um gateway de pagamento.
- **Acompanhamento de Pedido**: Após a confirmação do pagamento, o pedido é enviado para preparo. Os clientes podem acompanhar o progresso do seu pedido através das etapas: Recebido, Em Preparação, Pronto e Concluído.

## Tecnologias

- Node.js
- TypeScript
- Express
- MySQL (AWS RDS)
- DynamoDB
- Docker  (AWS ECS)
- AWS S3
- AWS SQS

## Arquitetura da aplicação

Link para visualização externa: <a href="https://drive.google.com/file/d/1i-Q8P7aScD1-dboFIOZlOZoH7tCIXEe7/view?usp=drive_link">Arquitetura</a> 
![Tech Challenge FASE 05](assets\core\tech-challenge-FASE05-Arquitetura.png)

# Padrão SAGA - Coreografia

Optamos pelo padrão de Coreografia para nossa aplicação, a decisão se alinhou perfeitamente com o desenvolvimento natural do projeto ao longo do percurso e fases passadas. Ao chegarmos na Fase 05, notamos que, de forma quase intuitiva, já estávamos aplicando princípios da Coreografia em nosso trabalho. A escolha também se baseou em alguns dos benefícios chave que reconhecemos para o futuro do projeto:

## Autonomia dos Serviços

Favorece a autonomia a cada serviço para que reaja a eventos de forma independente, reduzindo dependências diretas, facilitando a manutenção e escalabilidade.

## Desacoplamento

Baixo acoplamento entre os serviços, facilitando futuras manutenções e escalabilidade.

## Simplicidade e agilidade de desenvolvimento

Para a versão atual do nosso projeto, com menor complexidade, auxilia a simplificação do design e facilita o desenvolvimento ágil de novos serviços que apenas precisam reagir aos eventos existentes no sistema.

## Flexibilidade Evolutiva

Oferece maior flexibilidade para a evolução do sistema, já que a adição de novas funcionalidades requer apenas a subscrição a eventos existentes ou a publicação de novos.


## Modelagem de Dados

![image](assets\core\modelagem_dados.png)

## Iniciar Aplicação

### Dependências

<img src="https://github.com/kubernetes/minikube/raw/master/images/logo/logo.png" width="100" alt="minikube logo">

### Como montar o ambiente no lab

1. Criar Buckets para cada repositório
2. Preencher os nomes dos buckets S3 nas variáveis da organização
    - variáveis com inicial `TF_VAR_TFSTATE` + nome do serviço
3. Rodar action de deploy do repositório `TC05-Shared-Infra`
4. Ao completar o deploy do TC05-Shared-Infra, preencher as `urls das filas` nas `variáveis da organização`
5. Rodar actions de deploy para `Customer-Infra` e `Customer-app`
6. Ao completar deploy do MS de Customer
    - Criar Api Gateway ligada a lambda function `validate-customer`
    - Editar variável de ambiente `DB_HOST` da lambda com a url do `RDS` de `Customer`
    - Verificar se demais variáveis correspondem ao mesmo do `MS Customer`


### Getting started:


## Documentação de APIs

Após iniciar a aplicação no minikube, acessar o link exibido no terminal e adicionar ao final `/api-docs`
![image](https://github.com/fellipySaldanha/Phase2-TC/assets/43252661/5dc8cbe3-b9ce-4afe-8cf0-c1202ff47b9b)

![image](https://github.com/fellipySaldanha/Phase2-TC/assets/43252661/cc96d1ff-27fb-4aaa-81e2-53872a3cc51b)
