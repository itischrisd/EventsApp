<h1 align="center">
  <div>
    <img width="80" src="https://raw.githubusercontent.com/itischrisd/itis-PJATK/main/logo.svg" alt="PJAIT logo" />
  </div>
  Events App
</h1>

Repozytorium zawiera projekt końcowy z zajęć praktycznych z [TIN](https://github.com/itisarchive/itis-TIN/) (Technologie
Internetowe) prowadzonych przez Annę Voitenkovą podczas studiów na [PJATK](https://www.pja.edu.pl/).

Kod jest rozpowszechniany na licencji [GPLv3](./LICENSE).

---

## Opis projektu

Events App to fullstackowa aplikacja webowa do zarządzania wydarzeniami i uczestnictwami. Projekt miał na celu
praktyczne zastosowanie współczesnego stacku technologicznego opartego o JavaScript, Node.js i React w architekturze
klient-serwer z relacyjną bazą danych.

Aplikacja umożliwia:

- **Zarządzanie użytkownikami** — rejestracja, logowanie, edycja i usuwanie kont z podziałem na role (administrator i
  zwykły użytkownik).
- **Zarządzanie wydarzeniami** — tworzenie, przeglądanie, edycja i usuwanie wydarzeń. Każde wydarzenie jest powiązane z
  użytkownikiem, który je utworzył.
- **Zarządzanie uczestnictwami** — zapisywanie się na wydarzenia, przeglądanie i edycja zgłoszeń, z możliwością dodania
  komentarza.
- **Autoryzacja i uwierzytelnianie** — system logowania oparty na tokenach JWT z kontrolą dostępu do zasobów w
  zależności od roli i właściciela zasobu.
- **Internacjonalizacja (i18n)** — obsługa wielu języków (polski i angielski) zarówno po stronie backendu, jak i
  frontendu.

---

## Technologie i narzędzia

### Backend (`events-be`)

- **Node.js** — środowisko uruchomieniowe JavaScript po stronie serwera
- **Express** — minimalistyczny framework webowy do obsługi routingu, middleware i żądań HTTP
- **Sequelize** — ORM do komunikacji z bazą danych, definiowania modeli i relacji
- **MySQL2** — sterownik do połączenia z bazą danych MySQL
- **JSON Web Token (jsonwebtoken)** — generowanie i weryfikacja tokenów JWT do uwierzytelniania
- **bcrypt** — haszowanie haseł użytkowników
- **Joi** — walidacja schematów danych przychodzących w żądaniach
- **i18next + i18next-fs-backend + i18next-http-middleware** — internacjonalizacja komunikatów serwera
- **cors** — konfiguracja polityki CORS dla komunikacji z frontendem
- **dotenv** — zarządzanie zmiennymi środowiskowymi z pliku `.env`
- **morgan** — logowanie żądań HTTP w trybie deweloperskim
- **ESLint** — statyczna analiza kodu i utrzymanie spójnego stylu

### Frontend (`events-fe`)

- **React 18** — biblioteka do budowy interfejsu użytkownika w oparciu o komponenty
- **Vite** — szybkie narzędzie do budowania i serwowania aplikacji frontendowej
- **React Router DOM** — routing po stronie klienta (SPA)
- **Redux Toolkit + React Redux** — zarządzanie globalnym stanem aplikacji (m.in. sesja użytkownika, powiadomienia)
- **React Hook Form + @hookform/resolvers** — obsługa formularzy z walidacją
- **Yup** — deklaratywna walidacja schematów danych w formularzach
- **Axios** — klient HTTP do komunikacji z API backendu
- **i18next + react-i18next + i18next-browser-languagedetector** — internacjonalizacja interfejsu użytkownika
- **date-fns** — formatowanie i operacje na datach
- **js-cookie** — zarządzanie ciasteczkami (przechowywanie tokenu JWT)
- **prop-types** — walidacja typów propsów komponentów React
- **ESLint** — statyczna analiza kodu

---

## Uruchomienie projektu

### Wymagania wstępne

- **Node.js** (v18+) i **npm**
- **MySQL** (v8+) — lokalnie lub w kontenerze Docker

### 1. Przygotuj bazę danych

1. Uruchom serwer MySQL.
2. Wgraj schemat bazy danych:
   ```bash
   mysql -u <użytkownik> -p < events-be/db/schema.sql
   ```
3. Opcjonalnie wgraj dane przykładowe:
   ```bash
   mysql -u <użytkownik> -p < events-be/db/sample_data.sql
   ```

### 2. Skonfiguruj backend

1. Przejdź do folderu `events-be` i zainstaluj zależności:
   ```bash
   cd events-be
   npm install
   ```
2. Utwórz plik `.env` na podstawie szablonu z pliku `.env.example` i uzupełnij wymagane zmienne środowiskowe.

3. Uruchom serwer backendowy:
   ```bash
   npm start
   ```
   Backend będzie nasłuchiwał pod adresem `http://localhost:3000`.

### 3. Uruchom frontend

1. Przejdź do folderu `events-fe` i zainstaluj zależności:
   ```bash
   cd events-fe
   npm install
   ```
2. Uruchom serwer deweloperski:
   ```bash
   npm run dev
   ```
   Frontend będzie dostępny pod adresem `http://localhost:5173`.

W przypadku problemów sprawdź logi w terminalu i upewnij się, że baza danych została poprawnie skonfigurowana i jest
uruchomiona.

---

Jeśli potrzebujesz pomocy, zauważysz błędy lub masz pomysły na ulepszenia, śmiało skontaktuj się ze mną lub stwórz
pull request.
