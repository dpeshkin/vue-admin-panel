# Admin panel for loftcshool-adv-web-project

*Used tehcnologies*

    * pug
    * vue
    * vue-router
    * vuex

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Abstract

1. Общие стили подключаются в webpack.config.js, добавляется новая точка входа для стилей в entry. Так же необзодимо подключит стили в index.html
2. Прописываем конфиг лоадера для стилей, предварительно необходимо установить style-loader

    {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
    },

3. Теперь в файле layout/index.js мы можем подключать все общие стили, шрифты и тп. Для подключения normalize.css нужно дополнительно прописать в test - css. 

4. Подключение перменных миксинов и тп установим sass-recources-loader, который будет подмешивать их во все файлы

    npm i -d sass-resources-loader

5. Подключим его к vue-loader в webpack.config.js

    loader: {
            scss: [
              'vue-style-loader',
              'css-loader',
              'sass-loader',
              {
                loader: 'sass-resources-loader',
                options: {
                  resources: [
                    './src/stylesheets/variables.scss',
                    './src/stylesheets/mixins.scss'
                  ]
                }
              }
            ],
          },

6. Пропишем в router.js чтобы в корне рендерился компонент about

  const routes = [
    {path: '/', component: require('./components/About')}
  ]

7. Работа с картинками (чтобы сохранить пути)








