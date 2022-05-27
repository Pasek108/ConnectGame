# ConnectGame
 Logiczna gra napisana w czystym JS / CSS / HTML z użyciem biblioteki [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) wzorowana na mobilnych grach, 
 głównie na [Connect Me Login Puzzle](https://play.google.com/store/apps/details?id=net.bohush.connect.me.logic.puzzle) 
 oraz na [Connect it!](https://play.google.com/store/apps/details?id=indonesia.angarsalabs.ci).

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
Tłem menu jest popularny i bardzo prosty canvas na którym generowane są losowe punkty oraz ich wektory po których się poruszają. 
Gdy odległość między punktami jest mniejsza niż 100 rysowane jest między nimi połączenie koloru białego z przezroczystością ustawioną na   
(1 - (odległość / 100)), przez co linia staje się wyraźniejsza wraz z bliższą odległością i zanika gdy punkty się oddalają.
![Menu background](https://github.com/Pasek108/ConnectGame/blob/main/readme_images/menu_bg.png)

### Tryb kwadraty
#### Zasada działania
Gra w trybie kwadratowym działa za pomocą trójwymarowej tablicy, dla poziomu łatwego plansza 4x4 działa na tablicy o rozmiarach 6x6x5
![Array for easy level](https://github.com/Pasek108/ConnectGame/blob/main/readme_images/example_array.png)
Rozmiar 6x6 dla ablicy 4x4 spowodowany jest dodaniem pustych pól wokół aby ułatwić sprawdzanie połączeń, 
trzeci wymiar przyjmuje rozmiar 5 ponieważ przechowuje liczbę połączeń na stronach oraz typ obiektu.

#### Obiekty
Obiekty w trybie kwadratowym mają od 0 do 4 połączeń na stronie oraz typ. 

##### Połączenia obiektu
Połączenia zapisane są w kolejności ruchu wskazówek zegara zaczynając od góry na 4 pozycjach, na pozycji 5 znajduje się typ tj. [top, right, bottom, left, type]

##### Typy obiektów
W trybie kwadratowym istnieje 8 typów obiektów złożonych z 4 podstawowych typów.
* *"n"* od *no move*, obiekt z którym nic nie można zrobić
* *"r"* od *rotate*, obiekt który można obracać o 90 stopni (przesuwa połączenia w tablicy o jeden top -> right, right -> bottom itd.)
* *"v"* od *vertical move*, obiekt który można przesuwać po osi pionowej
* *"h"* od *horizontal move*, obiekt który można przesuwać po osi poziomej
* *"vr"* od *vertical move and rotate*, obiekt który można obracać oraz przesuwać po osi pionowej
* *"hr"* od *horizontal move and rotate*, obiekt który można obracać oraz przesuwać po osi pionowej
* *"vhr"* od *vertical and horizontal move and rotate*, obiekt który można obracać oraz przesuwać w dowolnym kierunku

#### Przykładowa plansza 
![Example game grid](https://github.com/Pasek108/ConnectGame/blob/main/readme_images/example_grid.png)

