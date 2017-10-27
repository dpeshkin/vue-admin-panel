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
```javascript
{
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader']
},
```
3. Теперь в файле layout/index.js мы можем подключать все общие стили, шрифты и тп. Для подключения normalize.css нужно дополнительно прописать в test - css. 

4. Подключение перменных миксинов и тп установим sass-recources-loader, который будет подмешивать их во все файлы
``` bash
npm i -D sass-resources-loader
```
5. Подключим его к vue-loader в webpack.config.js
```javascript
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
```
6. Пропишем в router.js чтобы в корне рендерился компонент about
```javascript
const routes = [
  {path: '/', component: require('./components/About')}
]
```
7. Работа с картинками (чтобы сохранить пути). Для этого редактируем alias в webpack.config.js. Теперь к картинкам можно обращаться по пути ~img/
```javascript
'img': path.resolve(__dirname, './src/assets/img')
```
8. Чтобы изолировать представление и модель, на нужен менеджер остояний vuex. Для начала создадим директорию store, в которой будут храниться данные.
9. В папке store создадим index.js в который подключим vue и vuex, который установим
``` bash
npm i vuex
```
10. Лучше разбивать хранилище на отдельные модули для раьоты с различными данные (skills, articles, projects..)
11. Импортируем index.js store в main.js и подключим его:
```javascript
import { store } from './store'
```
12. Внутри модуля skills (это объект) созададим его и экспортируем:
```javascript
const skills = {

}
export default skills;
``` 
13. Внутри skiklls.js должны быть определенные методы(например получить данные и тп, они хранятся внутри actions)
14. У $store есть методы для работы с данными, например dispatch
15. Для работы с ajax исполльзуются различные билиотеки(axios и тп), для vue это vue-resource
``` bash
npm i vue-resource
```
16. vue-resource подключаем в store, тк запросы мы будем делать именно из него







