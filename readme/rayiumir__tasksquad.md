<p align="center">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="./art/Dark_TaskSquad.png">
        <source media="(prefers-color-scheme: light)" srcset="./art/Light_TaskSquad.png">
        <img alt="TaskSquad Logo" src="./art/Light_TaskSquad.png">
    </picture>
</p>

## TaskSquad

A Tasks Management Project Based on Laravel and Livewire 

## How to use

```bash
git clone https://github.com/Rayiumir/TaskSquad.git
cd TaskSquad/
composer install
cp .env.example .env
php artisan migrate --seed
php artisan key:generate
php artisan serve
```

## ScreenShots

### Admin

<table class="table">
  <thead>
    <tr>
      <th scope="col" width="1000px">Admin Index</th>
      <th scope="col" width="1000px">Users</th>
      <th scope="col" width="1000px">Groups</th>
      <th scope="col" width="1000px">Roles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img src="./screenshots/admin/admin_index.png" width="100%" alt="Admin Index">
      </td>
      <td>
        <img src="./screenshots/admin/users_index.png" width="100%" alt="Users">
      </td>
      <td>
        <img src="./screenshots/admin/groups_index.png" width="100%" alt="Groups">
      </td>
      <td>
        <img src="./screenshots/admin/roles_index.png" width="100%" alt="Roles">
      </td>
    </tr>
  </tbody>
</table>
<table class="table">
  <thead>
    <tr>
      <th scope="col" width="1000px">Permissions</th>
      <th scope="col" width="1000px">Tasks</th>
      <th scope="col" width="1000px">Projects</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img src="./screenshots/admin/permissions_index.png" width="100%" alt="Permissions">
      </td>
      <td>
        <img src="./screenshots/admin/tasks_index.png" width="100%" alt="Tasks">
      </td>
      <td>
        <img src="./screenshots/admin/projects_index.png" width="100%" alt="Projects">
      </td>
    </tr>
  </tbody>
</table>

### User

<table class="table">
  <thead>
    <tr>
      <th scope="col" width="1000px">User Index</th>
      <th scope="col" width="1000px">Tasks</th>
      <th scope="col" width="1000px">Projects</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img src="./screenshots/user/admin_index.png" width="100%" alt="Admin Index">
      </td>
      </td>
      <td>
        <img src="./screenshots/user/tasks_index.png" width="100%" alt="Tasks">
      </td>
      <td>
        <img src="./screenshots/user/projects_index.png" width="100%" alt="Projects">
      </td>
    </tr>
  </tbody>
</table>