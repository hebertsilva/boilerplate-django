# Styleguide

Antes de continuar você deve ter um certo conhecimento sobre especificidade no CSS e entender a sintaxe SCSS.

## Estilo do código

### Espaçamento

* Use soft-tabs com quatro espaços para identar, utilizar espaços é a unica forma de garantir que a formatação se apresente da mesma forma em qualquer ambiente
* Coloque espaço após o `:` nas declarações
* Quebre linhas entre as regras
* Quando agrupar seletores, coloque um seletor por linha
* Sempre coloque os colchetes no fim de uma declaração em uma nova linha
* Cada declaração deve estar em apenas uma linha
* Utilize o plugin do **[editorconfig](http://editorconfig.org/)** no Sublime para garantir o padrão de identação do código

### Formatação

* Sempre que possível use cores hexadecimais #000 no lugar de rgba
* Use // para comentários e /**/ apenas para comentários de documentação
* Evite especificar unidades para valores zero, ex: margin: 0; no lugar de margin: 0px;
* Evite usar declarações abreviadas onde é necessário mais de uma delcaração ex: margin: 0 20px 10px;

### Boas práticas com SCSS

Evite aninhar muito código no SCSS, tente usar no máximo três níveis.


    .list{
        background: blue;
        .btn{
            padding: 10px;
            a{
                color: purple;
            }
        }
    }

Sempre que incluir mixins em um seletor, inclua os mixins primeiro, o mesmo vale quando usar `@extend`.

    ul{
        li{
            @include inline-block
            @include single-transition;
            @include opacity(50);
            padding: 10px;
            background: #ddd;
        }
    }

### Exemplos

Alguns exemplos das práticas listadas acima.

    // boas práticas de formatação

    .styleguide-format {
        color: #000;
        background-color: rgba(0, 0, 0, .5);
        border: 1px solid #0f0;
    }

    // Seletores individuais em suas linhas

    .multiple,
    .classes,
    .get-new-lines {
        display: block;
    }

    // Evitar declarações desnecessárias

    .not-so-good {
        margin: 0 0 20px;
    }

    .good {
      margin-bottom: 20px;
    }

## Organização dos arquivos

No geral a organização segue a seguinte estrutura.

    compass
       └── source
            ├── core
            │   ├── _all_sprites.scss
            │   ├── _base.scss
            │   ├── _buttons.scss
            │   ├── _fonts.scss
            │   ├── _icons.scss
            │   ├── _lists.scss
            │   ├── _mixins.scss
            │   ├── _reset.scss
            │   ├── _sprites.scss
            │   ├── _type.scss
            │   ├── _utils.scss
            │   └── _variables.scss
            ├── vendor
            │   ├── fonts.scss
            ├── views
            │   ├── base.scss
            │   ├── catalog.scss
            │   ├── checkout.scss
            │   ├── customer.scss
            │   └── order.scss
            └── main.scss
