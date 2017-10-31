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
const skills = {}
export default skills;
``` 
13. Внутри skiklls.js должны быть определенные методы(например получить данные и тп, они хранятся внутри actions)
14. У $store есть методы для работы с данными, например dispatch запускает определенный метод в объекте. По хуку created(), припишем в skills-list(родительский элемент) запуск метода fetchSkils для skills.js. Запрос пишется и именно в компоненте родителя, чтобы грузить данные именно тогда когнда они нудны.
```javascript
created() {
  this.$store.dispatch('fetchSkills')
},
```
15. Для работы с ajax исполльзуются различные билиотеки(axios и тп), для vue это vue-resource
``` bash
npm i vue-resource
```
16. vue-resource подключаем в store/index.js, тк запросы мы будем делать именно из него. Создаем новое свойство getters, которое будет хранить метод $http, который содержит VueResource. Этот метод буждет храниться в rootGetters объекта state
```javascript
getters: {
  $http: () => (VueResource)
},
```
17. У skills.js создадим новое свойство state которое будет описывать состояния элемента (например цве ткнопки и тп)
18. В skills.js пропишем запрос к серверу, внутри метода fetchSkills:
```javascript
actions: {
  fetchSkills({ state, rootGetters}){
    const { $http } = rootGetters;
    $http.get('/src/components/About/data.json').then(responce => {
      state.data = responce.body
    }, error => {
      console.error(error)
    })
  }
}
```
18. Для удобнооо исопльзования экшнов и геттеров, в vuex есть мапперы (позволяет сократить запись, убрать this). Для этого в skill-list ипортируем эти функции
```javascript
import { mapActions, mapGetters } from 'vuex'
```
Скиллы мы будем получать внутри свойства computed используя ...
```javascript
computed: {
  ...mapGetters({'getSkills'})
},
methods: {
  ...mapActions(['fetchSkills'])
},
```
...подмешивает методы из обекта skills к тому обекту куда его загрузили
Для работы с оператором Spread ... надо проапгрейдить babel до stage-1
```bash
npm i babel-preset-stage-1 -D
```
19. Теперь мы можем использовать методы из skills в skill-list использую коротку запись через this, вместо длинной из п.14: 
```javascript

``` 
20. Данные из хранилища лучше брать с помощбю геттеров:
```javascript
getters: {
  getSkills(state) {
    return state.data
  }
},
```
21. Теперь мы получаем массив скилов в About компоненте и можем передавать его вниз по цепочке
22. Добавляем новый скилл. Сделаем метод в skill-item и заэмиттим его в скилл-лист. Нам необходимо добавить данные в стор, это делается с помощью мутации
```javascript
mutations: {
  addNewSkill(state, skill) {
    state.data.push(skill)
  }
},
```
23. Если есть БД то, в экшенах мы бы написали запрос к БД, и уже после этого прописали мутациюю
24. ЗАведем mapMutation для мутаций в родительсмком комроненте:
```javascript
...mapMutations(['addNewSkill']),
addSkill(skill) {
  this.addNewSkill(skill);
}
```
25. Удаление: Заведем $eventBus в main.js, тк нам придется передавать события через несколько уровней
```javascript
export const $eventBus = new Vue();
```
26. В skills.js создадим мутацию removeSavedSkill:
```javascript
removeSavedSkill(state, id) {
  state.data = state.data.filter(skill => skill.id != id)
}
```
27. В skill-item создадим метод removeSkill(id) и передадим его в eventBus, предварительно заимпортим ивентБас из main.js
```javascript
removeSkill(id) {
  $eventBus.$emit('removeSkill', id)
}
```
28. Подключим мутацию removeSavedSkill в about и через eventBus будем следить за removeSkill:
```javascript
methods: {
  ...mapActions(['fetchSkills']),
  ...mapMutations(['addNewSkill', 'removeSavedSkill']),
  addSkill(skill) {
    this.addNewSkill(skill);
  }
},
created() {
  this.fetchSkills();
  $eventBus.$on('removeSkill', id => {
    this.removeSavedSkill(id);
  })
},
``` 
29. Валидация: simple-vue-validator
```bash
npm i simple-vue-validator
```
30. ВАлидатор подключается как миксин, в skills-list, так же необходимо заимпортить объект валидатора:
```javascript
import { Validator } from 'simple-vue-validator';
mixins: [require('simple-vue-validator').mixin],
```
31. Валидируются не инпуты а данные внутри объекта data, в skill-item добавим свойство vlidators и проверим поля на пустоту: 
```javascript
validators: {
  'newSkill'(value) {
    return Validator.value(value).required('Скилл не может быть пустым!');
  }
},
```
32. Для вывода ошибки есть глобальный объект validation который можно подключить к компоненту(рядом с инпутом:
```javascript
div {{ validation.firstError('newSkill')}}
```
33. Задизаблим кнопку и добавим красную рамку инпуту в случае ошибки валидации(черз класс):
```javascript
button(
  :disabled="validation.hasError('newSkill')"
)
input(
  :class="{error : validation.hasError('newSkill')}"
)
```
34. Сделаем невозмодность отправки пустого поля, для этого в метод addSkill добавим метод $validate() который возвращает промиc, в котором в случае успешной валидации будет запускаться наше добавление скилла. Так же необходимо скинуть валидацию с помощью встроенного метода reset,, иначе после отправки и обнуления поля сразу будет вылазить валидация:
```javascript
addSkill(skillType) {
  this.$validate().then(success => {
    if (!success) return;
    this.$emit("addSkill", {
      id: Math.round(Math.random() * 10),
      name: this.newSkill,
      percents: 0,
      type: this.checkSkillType(skillType)
    }),
    this.newSkill = "";
    this.validation.reset();
  });
},
```
## Работа с .svg
1. Установим svg-fill-loader
```bash
npm i -D svg-fill-loader
```
2. Подключаем его в webpack.config.js  до css-loader:
```javascript
'svg-fill-loader/encodeSharp',
```
3. Укажем вебпакку как обрабатывать свг:
```javascript
{
  test: /\.svg$/,
  use: [
    'url-loader',
    {
      loader: 'svg-fill-loader?fill=#fff'
    }
  ]
}
```
4. Создадим sass миксин для оьработки svg:
```scss
@mixin svg($url, $color) {
   $base-color: str-slice(inspect($color), 2);
   background-image: unquote('url("' + $url + "?fill=%23" + $base-color +'")');
 }
```
5. Теперь svg можно вставлять через цсс в формате base64
```scss
@include svg("~img/phone.svg", #a23b43);
```





