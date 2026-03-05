<h1 align="center">
  <div>
    <img width="80" src="https://raw.githubusercontent.com/itischrisd/itis-PJATK/main/logo.svg" alt="PJAIT logo" />
  </div>
  Events App
</h1>

Repozytorium zawiera projekt końcowy z zajęć praktycznych z [TIN](https://github.com/itisarchive/itis-TIN/) (Technologie
Internetowe) prowadzonych przez Anną Voitenkovą podczas studiów na [PJATK](https://www.pja.edu.pl/).

Kod jest rozpowszechniany na licencji [GPLv3](./LICENSE).

---

## **Instrukcja uruchomienia aplikacji**

Aby uruchomić aplikację, wykonaj poniższe kroki:

---

### **1. Skonfiguruj plik `.env`**

W folderze `events-be` w pliku `.env` uzupełnij parametry konfiguracyjne zgodnie ze swoim środowiskiem:

```
DB_NAME=<nazwa schematu bazy danych, domyślnie events_db>
DB_USER=<nazwa użytkownika bazy danych>
DB_PASSWORD=<hasło użytkownika bazy danych>
DB_HOST=<adres bazy danych>
DB_DIALECT=<dialekt bazy danych, np. mysql>
PORT=<port serwera backendowego, domyślnie 3000>
JWT_SECRET=<tajny klucz JWT>
FRONTEND_URL=<adres frontendu do konfiguracji CORS, np. http://localhost:5173>
```

Upewnij się, że wszystkie parametry są poprawnie ustawione.

---

### **2. Przygotuj bazę danych**

1. Uruchom serwer MySQL na swoim komputerze. Preferowane jest użycie Dockera.
2. Wgraj pliki SQL do bazy danych:
    - Plik `schema.sql` (znajdujący się w folderze `events-be/db`):
      ```bash
      mysql -u <nazwa użytkownika dostępowego> -p events_db < db/schema.sql
      ```
    - Plik `sample_data.sql` (również w folderze `events-be/db`):
      ```bash
      mysql -u <nazwa użytkownika dostępowego> -p events_db < db/sample_data.sql
      ```

---

### **3. Uruchom backend**

1. Przejdź do folderu `events-be`:
   ```bash
   cd events-be
   ```
2. Zainstaluj zależności:
   ```bash
   npm install
   ```
3. Uruchom serwer backendowy:
   ```bash
   node run start
   ```

---

### **4. Uruchom frontend**

1. Wróć do folderu głównego projektu:
   ```bash
   cd ..
   ```
2. Przejdź do folderu `events-fe`:
   ```bash
   cd events-fe
   ```
3. Zainstaluj zależności:
   ```bash
   npm install
   ```
4. Uruchom serwer frontendowy:
   ```bash
   npm run vite
   ```

---

### **5. Sprawdź działanie aplikacji**

1. Frontend aplikacji powinien być dostępny pod adresem:
   ```
   http://localhost:5173
   ```
2. Backend nasłuchuje na porcie:
   ```
   http://localhost:3000
   ```

---

Jeśli pojawią się problemy, sprawdź logi w terminalu lub upewnij się, że baza danych została poprawnie skonfigurowana i
jest uruchomiona.
