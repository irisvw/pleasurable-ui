# Tumi Mundo







Ontwerp en maak met een team voor een opdrachtgever een interface waar gebruikers blij van worden.

De instructie vind je in: [INSTRUCTIONS.md](https://github.com/fdnd-task/pleasurable-ui/blob/main/docs/INSTRUCTIONS.md)



## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving

<!-- Bij Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
<!-- Voeg een mooie poster visual toe 📸 -->
<!-- Voeg een link toe naar Github Pages 🌐-->


## Ontwerpkeuzes



### PLaylist overview pagina:

In de playlist overview pagina zie je alle playlists staan, de playlist kun je like, ook heb je een play button om naar de verhalen te kunnen luisteren. Deze pagina lijkt op de all sotries pagina, maar dat is het niet want inplaats van stories zie je hier alle playlists, die je later door een like te geven ook kan toevoegen aan een liked playlist.

<img width="388" alt="Screenshot 2025-05-20 at 10 09 58" src="https://github.com/user-attachments/assets/33cc79ae-4c38-4421-8917-e97bbe4a4e21" />

In de volgende issue zie je wat voor code ik heb gebruikt om deze pagina te bouwen.

[Playlist overview HTML prototype #9](https://github.com/irisvw/pleasurable-ui/issues/9)


### PLaylist detail pagina:

In de detailpage kom je terecht na het klikken op een playlist van de playlist overview pagina. Hier zie je de playlist die zijn toegevoegd met de play button, like button en de tekst uit de api.


<img width="216" alt="Screenshot 2025-05-15 at 13 47 16" src="https://github.com/user-attachments/assets/27dbf54e-1bc4-4a02-8f2e-ab5ff0e4d2aa" />



In de volgende issue zie wat voor code ik heb gebruikt om deze pagina de bouwen.
https://github.com/irisvw/pleasurable-ui/issues/11


## Prototype

### Pleasearable micro interaction like button

Voor de pleasurable micro interactie van data heb ik de like functie gekozen. De like button wordt rood ingekleurd bij het klikken,als animatie word de het hart rood ingekleurd.


https://github.com/user-attachments/assets/a7ffca04-471c-469b-aec9-f82afea1130a

### Pleasearable fetch interaction searchbutton

Voor de pleasurable laag voor het fetchen heb ik de searchbar gekozen, als eerst krijg je een vergrootglas te zien. Als je daarop klikt dan wordt de searchbar open geklapt, je kan vervolgens zoeken naar de juiste playlist.

https://github.com/user-attachments/assets/40ca95ee-6d92-4bcc-821b-f71434d3046f


## Pleasureable button state

Ik heb als pleasureable button states de play button gekozen. Op de playbutton wil ik een loading interactie toevoegen in loading state.


https://github.com/user-attachments/assets/353620d5-5f41-4869-a13c-3dc62dd25200


HTML

```
 <span class="play-text"> ▶ {{ playlist.name }}</span>
                <span class="loading-spinner" aria-hidden="true">
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
                    <linearGradient id='a7'>
                      <stop offset='0' stop-color='#FFFFFF' stop-opacity='0'></stop>
                      <stop offset='1' stop-color='#FFFFFF'></stop>
                    </linearGradient>
                    <circle fill='none' stroke='url(#a7)' stroke-width='15' stroke-linecap='round'
                      stroke-dasharray='0 44 0 44 0 44 0 44 0 360' cx='100' cy='100' r='70'
                      transform-origin='center'>
                      <animateTransform type='rotate' attributeName='transform' calcMode='discrete'
                        dur='2s' values='360;324;288;252;216;180;144;108;72;36' repeatCount='indefinite' />
                    </circle>
                  </svg>
                </span>
              </button>
```
Commit c2e2914


CSS

```
 /* Play Button */
    .play-button {
      position: relative;
      background-color: #3ac6ff;
      border: none;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 50px; /* Circular button */
      font-weight: bold;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .play-button:hover {
      background-color: #64d4ff;
    }
    
    .loading-spinner {
      display: none;
      width: 24px;
      height: 24px;
    }
    
    .play-button.loading .loading-spinner {
      display: inline-block;
    }
    
    .play-button.loading .play-text {
      display: none;
    }
```


Commit 085ddc4

JAVASCRIPT
```
<script>
        const playButtons = document.querySelectorAll(".play-button");
      
        playButtons.forEach(button => {
          button.addEventListener("click", function () {
            // Prevent multiple clicks
            if (button.classList.contains("loading")) return;
      
            button.classList.add("loading");
      
            setTimeout(() => {
              button.classList.remove("loading");
              alert("Playing playlist: " + button.querySelector(".play-text").textContent);
            }, 2000);
          });
        });
      </script>
```

Commit 2225e9f


link figma: https://www.figma.com/design/qLcAMX3o2fGREz8CYb7uQt/TUMI?node-id=147-536&t=HmsiyACNfIxrbtVv-1 


## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framwork of library gebruikt? -->

## Installatie
<!-- Bij Instalatie staat hoe een andere developer aan jouw repo kan werken -->

## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
