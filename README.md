## Space runner

![Build status](https://github.com/aleksandr-loskutov/middle.messenger.praktikum.yandex/actions/workflows/docker-deploy.yml/badge.svg)

Игра Space runner - командная разработка от идеи до результата по методологии scrum и git flow с cross-review.
В разработке принимали участие [4 человека](https://github.com/Stack-overflow-runners/game/graphs/contributors).

## Demo
Доступно [по ссылке](https://spacerunner.online/sign-up). Короткое [видео с функционалом](https://www.berrycast.com/conversations/8b50b284-959c-5c16-b106-b28f441c848f).

## Screenshot
![App Screenshot](https://files.aleksandrl.ru/sites/portfolio/img/spacerunner-gameplay4.png)

## Технологии
- TypeScript;
- React - для всего, кроме игры;
- Redux, Redux-Thunk, Redux-Toolkit - стейт-менеджмент;
- Canvas API - для отрисовки игры;
- Ant-D & PostCSS — стилизация;
- React Testing Library & Jest — тесты;
- Vite — сборщик;
- Express — веб-сервер;
- PostgreSQL — база данных;
- Sequelize — ORM;
- Docker + github actions для автодеплоя на VDS;
- EsLint, Prettier — линтеры.

### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
3. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
4. Выполните команду `yarn dev --scope=server` чтобы запустить только server


### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось


`yarn preview --scope client`
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Production окружение в докере
Перед первым запуском выполните `node init.js`

`docker compose up` - запустит три сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`
