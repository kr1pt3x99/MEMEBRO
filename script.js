document.addEventListener('DOMContentLoaded', () => {
    // Canvas-Element und Kontext initialisieren
    const canvas = document.getElementById('memeCanvas');
    const ctx = canvas.getContext('2d');

    // Meme-Formular-Handling
    document.getElementById('memeForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Formulareingaben sammeln
        const topText = document.getElementById('topText').value || '';
        const bottomText = document.getElementById('bottomText').value || '';

        // Größe des Canvas setzen (Optional)
        const width = document.getElementById('width').value || 500; // Standardbreite
        const height = document.getElementById('height').value || 500; // Standardhöhe
        canvas.width = width;
        canvas.height = height;

        // Hochgeladenes Bild als Vorlage verwenden
        const img = new Image();
        img.src = document.getElementById('meme-image').src; // Bildquelle setzen

        // Wenn das Bild geladen wurde, zeichne es auf dem Canvas
        img.onload = function() {
            // Canvas leeren und Bild zeichnen
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Text auf dem Meme zeichnen
            ctx.font = "30px Arial"; // Schriftgröße und -art
            ctx.textAlign = "center"; // Text zentrieren
            ctx.lineWidth = 4; // Breite der Kontur

            // Oberen Text zeichnen
            ctx.fillStyle = "white"; // Textfarbe
            ctx.strokeStyle = "black"; // Textkontur
            ctx.strokeText(topText, canvas.width / 2, 50); // Kontur zeichnen
            ctx.fillText(topText, canvas.width / 2, 50); // Text füllen

            // Unteren Text zeichnen
            ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20); // Kontur zeichnen
            ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20); // Text füllen
        };

        img.onerror = function() {
            console.error('Bild konnte nicht geladen werden. Stelle sicher, dass es ein Bild ist.');
        };
    });

    // Dateiupload-Verarbeitung
    document.getElementById('fileUpload').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('meme-image').src = e.target.result; // Setze die Quelle des Bildes auf das hochgeladene Bild
            };
            reader.readAsDataURL(file); // Lese das hochgeladene Bild
        }
    });

    // Galerie-Funktion hinzufügen
    function addMemeToGallery() {
        const memeImageUrl = canvas.toDataURL();
        const gallery = document.getElementById('meme-gallery');
        const img = document.createElement('img');
        img.src = memeImageUrl;
        img.style.width = '150px';
        gallery.appendChild(img);
    }

    document.getElementById('addToGallery').addEventListener('click', function() {
        addMemeToGallery();
    });

    // Download-Funktion für das Meme hinzufügen
    document.getElementById('downloadButton').addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = canvas.toDataURL(); // Erzeugt die Bild-URL
        link.download = 'meme.png'; // Dateiname
        link.click(); // Simuliert den Klick
    });
});
