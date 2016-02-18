![Django Boilerplate](https://bitbucket.org/allanbobs/repo_estudos/raw/master/django/static/img/common/logo_fb200x200.png)

# Django Boilerplate

* Repositório - https://bitbucket.org/allanbobs/repo_estudos
* Production - http://example.com.br

## Instalação

Siga os passos abaixo para instalação e configuração.

### Iniciando um novo Projeto


Faça um clone do django-boilerplate:

```shell
git clone git@bitbucket.org:allanbobs/repo_estudos.git
```

### Django

Crie um ambiente para o python usando o [virtualenv](https://pypi.python.org/pypi/virtualenv/) ou [virtualenvwrapper](http://virtualenvwrapper.readthedocs.org/en/latest/).

```shell
mkvirtualenv env
(env) pip install -r django/requirements.txt
```

Faça uma cópia do arquivo `django/app/settings/dev.template` e faça as configurações necessárias:

```shell
(env) cp django/app/settings/dev.template django/app/settings/dev.py
```

Após ter configurado o banco de dados use os comandos:

```shell
(env) cd django/app
(env) chmod +x manage.py
(env) ./manage.py syncdb --all  --settings=settings.dev
(env) ./manage.py migrate --fake  --settings=settings.dev
```

Inicie o servidor do django:

```shell
(env) ./manage.py runserver 0.0.0.0:8000  --settings=settings.dev
```

### Compass e Grunt

#### Instalando as dependências

Para compilar o CSS é necessário ter o **ruby** e o [bundler](http://www.bundler.io/) instalado:

```shell
gem install bundler
```

Instale também o [NodeJS](http://nodejs.org/)

Em seguida o pacote do [Grunt](http://gruntjs.com/getting-started)

```shell
npm install -g grunt-cli
```

Instale as dependências do Grunt para o projeto

```shell
npm install
```

Instale as dependências do Compass

**Opção 1**:

```
cd compass
bundle install --path .bundle
```

**Opção 2** (usando o atalho do Grunt):

```shell
grunt bundler
```

#### Compilando CSS

**Opção 1**:

```shell
cd compass
bundle exec compass compile
```

**Opção 2**:

```shell
grunt css
```

#### Monitorando alterações no CSS

**Opção 1**:

```shell
cd compass
bundle exec compass watch
```

**Opção 2**:

Essa opção também roda o servidor do `Livereload`.

```shell
grunt
```

### Outras tarefas disponíveis no Grunt

#### Documentação do CSS

```shell
grunt docs
```
Gera a documentação do core do CSS. A documentação é gerada no diretório `styleguide/html`.

A documentação pode ser visualizada em [http://0.0.0.0:9000](http://0.0.0.0:9000).


#### Otimização de imagens

```shell
grunt imagemin
```

Otimiza as imagens JPG e PNG utilizando o plugin [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin)

#### Geração de favicons

```shell
grunt favicons
```
Gera favicons a partir de um arquivo base em `django/static/favicon/favicon-base.png`, utiliza o plugin [grunt-favicons](https://github.com/gleero/grunt-favicons).
Os favicons serão gerados no diretório `django/static/favicon`.

#### Logo em Base64

```shell
grunt logo
```
Gera o logo usando `base64` para a página de erro `50x` em `nginx/50x.html` a partir de um arquivo em `django/static/img/common/logo_fb200x200.png`.
