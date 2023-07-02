  var searchInput = document.getElementById('input-form');
  var results = document.querySelector('.results');
  
  //  Prend les recherches precedentes dans le cookie
  var suggestionList = getCookie("suggestionList").split(','); 
  
  // Gérer l'événement de saisie de l'utilisateur pour fournir des suggestions
  searchInput.addEventListener("input", function (event) {
    var inputValue = searchInput.value;
    var suggestedWords = suggest(inputValue, suggestionList);
    
    console.log(suggestedWords)        
    // Afficher les suggestions
    // ... Logique pour afficher les suggestions dans l'interface utilisateur ...
  });


  //  Le recherche est lancé
  searchInput.addEventListener("keydown", function(event) {
    // event.preventDefault();    
    if (event.keyCode === 13) {
      var inputValue = event.target.value;

      //  Ajouter la nouvelle recherche dans le tableau
      if(!suggestionList.includes('inputValue')) {
        suggestionList.push(inputValue);
      }

      //  Reinitialiser le cookie
      deleteCookie("suggestionList");
      setCookie("suggestionList", suggestionList, 30);
      // Effectuer des actions en fonction de la valeur saisie et de l'appui sur "Entrée"
      // (par exemple, lancer la recherche, afficher les résultats, etc.)
    }
  });

  function levenshteinDistance(ch1, ch2) {
    // Création d'une matrice pour stocker les distances
    const matrix = [];
    for (let i = 0; i <= ch2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= ch1.length; j++) {
      matrix[0][j] = j;
    }

    // Calcul des distances
    for (let i = 1; i <= ch2.length; i++) {
      for (let j = 1; j <= ch1.length; j++) {
        if (ch2.charAt(i - 1) === ch1.charAt(j - 1)) {
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
    return matrix[ch2.length][ch1.length];
  }
    
  
  // Fonction de suggestion basée sur la distance de Levenshtein
  function suggest(inputText, suggestions) {
    
    inputText = inputText.toLowerCase();


    // Filtrer les suggestions qui ont une distance de Levenshtein inférieure à un seuil
    var threshold = Math.floor(inputText.length / 2);

    var filteredSuggestions = suggestions.filter(function (suggestion) {      
      return (
        suggestion.startsWith(inputText)
        || (levenshteinDistance(inputText, suggestion) <= threshold 
        && inputText.length <= suggestion.length)
      )
    });

    return filteredSuggestions;
  }      

  function setCookie(name, value, daysToExpire) {
    var cookieString = name + "=" + encodeURIComponent(value);
  
    if (daysToExpire) {
      var expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + daysToExpire);
      cookieString += "; expires=" + expirationDate.toUTCString();
    }
  
    document.cookie = cookieString;
  }

  function getCookie(name) {
    var cookieName = name + "=";
    var cookieArray = document.cookie.split(";");    
  
    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i];
            
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
            
      if (cookie.indexOf(cookieName) === 0) {
        return decodeURIComponent(cookie.substring(cookieName.length));
      }
    }
  
    return "";
  }
  
  
  function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  
          
  
  