# Учебный проект (01.02.2022)

> ## Просьба !!!
>
> ## Уважайте мой труд и мою открытость :)))
>
> ## Напишите в Issues что вы думаете про данный подход

## Установка. Запуск

Последовательно выполнить команды:

- установка пакетов
- билд приложения
- запуск приложения

```sh
yarn install
yarn build
yarn start
```

- В браузере в строке адреса ввести
  `localhost:8010/`
- На странице в верхнем меню нажать `Программы обучения`

## Бек

1. В качестве mock API используется [mockapi.io](https://mockapi.io/projects/61f7d1c339431d0017eafa32)
2. Эндпоинты:
   - получени списка программ (в том числе с панинацией)
   - получение детальной информации по пргорамме
3. Модель данных (сущность) "Программа обучения"

```ts
export default class TrainingModel extends SeoModel {
  id: number;
  name: string;
  description?: string;
  location?: string;
  city: string;
  date: string;
  duration?: any;
  price: number;
  price_description: string;
  status: string;
  is_online: boolean;
  lecturer: string;
  lecturer_description?: string;
  lecturer_position?: string;
  days: { name: string; content: string }[] = [];
  // Моковый FK на справочник категорий программ
  category_id = Math.floor(Math.random() * (6 - 0 + 0) + 0);
}

// Моковый спрачоник "Категории программ обучения"
export const TrainingCategory = [
  { id: 0, name: "Вирусология" },
  { id: 1, name: "Хирургия" },
  { id: 2, name: "Бактериология" },
  { id: 3, name: "Психиатрия" },
  { id: 4, name: "Терапия" },
  { id: 5, name: "Наркология" },
];
```

## Стек технологий. Общие принципы

### Базовый стек

1. [NuxtJS 2.15.8](https://nuxtjs.org)
2. [TypeScript c nuxt-property-decorator](https://github.com/nuxt-community/nuxt-property-decorator#readme)
3. [Tailwind CSS](https://tailwindcss.com/)

### Пакеты. Компоненты. Плагины

1. [nuxt/axios](https://github.com/nuxt-community/axios-module#readme)
2. [cookie-universal-nuxt](https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt#readme)
3. [Day.js](https://day.js.org/)
4. [imask.js](https://imask.js.org/)
5. [Vue Functional Calendar](https://github.com/ManukMinasyan/vue-functional-calendar#readme)
6. [Vue.js modal](https://github.com/euvl/vue-js-modal#readme)
7. [Vue-multiselect](https://vue-multiselect.js.org/)
8. [Vuelidate](https://github.com/vuelidate/vuelidate#readme)
9. Компоненты обертки, директивы, плагины собственной разработки

### Принцип построения (организации) приложения

1. Структура папок на основе Модульной архитектуры (DDD)
2. Реализован модуль (build) и плагины `src\_core\nuxt_modules\init-router-store.module.ts`, который автоматически:
   - регистрирует Vuex-модули
   - маршруты (vue-router)
   - расширяет пути до папок с компонентами для авторегистрации компонентов (nuxt components:true)
3. Взаимодействие с беком (API) и иная бизнес-логика вынесена в отделные классы-сервисы
4. Модели данных (DTO,ViewModel) строго типизированы
5. Компоненты (страницы) максимально "тупые". Содержат вызов методов сервисов для получения данных. При взаимодействии также вызывают соответствующие методы серсисов
6. Vuex используется в исключительных случаях, именно по назначению - "шаринг" **общих реактивных** данных уровня приложения
7. Обеспечена техническая SEO-оптимизация (микроразметка, метатаги и т.д.)

## Известные ошибки (не реализовано в рамках проекта)

1. Поиск по наименованию (описанию) не коррелирует с выбранной категорией программы (и наоборот)
2. При поиске по наименованию и выборе категрии "сбивается" пагинация
