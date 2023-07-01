function levenshteinDistance(str1, str2) {
    // Création d'une matrice pour stocker les distances
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
  
    // Calcul des distances
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // Substitution
            matrix[i][j - 1] + 1,     // Insertion
            matrix[i - 1][j] + 1      // Suppression
          );
        }
      }
    }
  
    // Retourner la distance entre les deux chaînes
    return matrix[str2.length][str1.length];
  }
  
  // Exemple d'utilisation
  const distance = levenshteinDistance("tsoa", "itokiana");
  console.log(distance); // Output: 3


  function autocomplete(input, suggestions) {   
  
    // Fonction de suggestion basée sur la distance de Levenshtein
    function suggest(inputText) {
      inputText = inputText.toLowerCase();
  
      // Filtrer les suggestions qui ont une distance de Levenshtein inférieure à un seuil
      var threshold = Math.floor(inputText.length / 2);
      var filteredSuggestions = suggestions.filter(function (suggestion) {
        return levenshteinDistance(inputText, suggestion) <= threshold;
      });

      return filteredSuggestions;
    }
  
    // Gérer l'événement de saisie de l'utilisateur pour fournir des suggestions
    input.addEventListener("input", function () {
      var inputValue = input.value;
      var suggestedWords = suggest(inputValue);
  
      // Afficher les suggestions
      // ... Logique pour afficher les suggestions dans l'interface utilisateur ...
    });
  }
  
  // Exemple d'utilisation
  var inputElement = document.getElementById("input");
  var suggestionList = ["apple", "banana", "orange", "grape", "watermelon"];
  
  autocomplete(inputElement, suggestionList);
  
  