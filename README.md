# ConnectGame
 Logiczna gra napisana w czystym JS / CSS / HTML z użyciem biblioteki [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) wzorowana na mobilnych grach, 
 głównie na [Connect Me Login Puzzle](https://play.google.com/store/apps/details?id=net.bohush.connect.me.logic.puzzle) 
 oraz na [Connect it!](https://play.google.com/store/apps/details?id=indonesia.angarsalabs.ci).
 <details>
    <summary>Screeny</summary>
    <img alt="Menu background" src="https://github.com/Pasek108/ConnectGame/blob/main/readme_images/menu.png">
    <img alt="Menu background" src="https://github.com/Pasek108/ConnectGame/blob/main/readme_images/levels.png">
    <img alt="Menu background" src="https://github.com/Pasek108/ConnectGame/blob/main/readme_images/game.png">
    <img alt="Menu background" src="https://github.com/Pasek108/ConnectGame/blob/main/readme_images/game_win.png">
</details> 

## Gotowe funkcje
* Generowanie planszy
* Poprawne działanie obiektów na siatce
* Animacja obrotu obiektów
* Rozpoznawanie połączeń między obiektami
* Ukończenie poziomu z animacją confetti
* Przechodzenie między poziomami
* Poruszanie się w historii za pomocą przeglądarki
* Animacja tła menu

## To-do
* Dodać poziomy w trybach:
  * Łatwy
  * Normalny
  * Zaawansowany
* Dodać tryby:
  * Sześciokąty
  * Trójkąty
  * Linie
* Poprawić generowanie losowych poziomów
* Dodać animacje przejścia oraz przesuwania obiektów

## Działanie
### Tło menu
Tłem menu jest popularny i bardzo prosty canvas na którym generowane są losowe punkty oraz ich wektory po których się poruszają. Gdy odległość między punktami jest mniejsza niż 100 rysowane jest między nimi połączenie koloru białego z przezroczystością rosnącą wraz z odległością, przez co linia saje się jaśniejsza gey punkty się zbliżają i zanika gdy się oddalają.
<details>
    <summary>Tło menu</summary>
    <img alt="Menu background" src="https://github.com/Pasek108/ConnectGame/blob/main/readme_images/menu_bg.png">
</details> 


### Tryb kwadraty
#### Zasada działania
Gra w trybie kwadratowym działa za pomocą trójwymarowej tablicy, dla poziomu łatwego plansza 4x4 działa na tablicy o rozmiarach 6x6x5. Rozmiar 6x6 dla tablicy 4x4 spowodowany jest dodaniem pustych pól wokół aby ułatwić sprawdzanie połączeń, trzeci wymiar przyjmuje rozmiar 5 ponieważ przechowuje liczbę połączeń na stronach oraz typ obiektu.
<details>
    <summary>Przykładowa tablica dla poziomu łatwego</summary>
    <img alt="Array for easy level" src="https://github.com/Pasek108/ConnectGame/blob/main/readme_images/example_array.png">
</details> 


#### Obiekty
Obiekty w trybie kwadratowym mają od 0 do 4 połączeń na stronie oraz typ. 

Połączenia zapisane są w kolejności ruchu wskazówek zegara zaczynając od góry na 4 pozycjach, na pozycji 5 znajduje się typ tj. [top, right, bottom, left, type]

W trybie kwadratowym istnieje 8 typów obiektów złożonych z 4 podstawowych typów.
* *"n"* od *no move*, obiekt z którym nic nie można zrobić
* *"r"* od *rotate*, obiekt który można obracać o 90 stopni (przesuwa połączenia w tablicy o jeden top -> right, right -> bottom itd.)
* *"v"* od *vertical move*, obiekt który można przesuwać po osi pionowej
* *"h"* od *horizontal move*, obiekt który można przesuwać po osi poziomej
* *"vr"* od *vertical move and rotate*, obiekt który można obracać oraz przesuwać po osi pionowej
* *"hr"* od *horizontal move and rotate*, obiekt który można obracać oraz przesuwać po osi pionowej
* *"vhr"* od *vertical and horizontal move and rotate*, obiekt który można obracać oraz przesuwać w dowolnym kierunku

<details>
    <summary>Przykładowa plansza dla poziomu łatwego</summary>
    <img alt="Example game grid" src="https://github.com/Pasek108/ConnectGame/blob/main/readme_images/example_grid.png">
</details> 

