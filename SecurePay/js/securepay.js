document.addEventListener("DOMContentLoaded", function () {
    // Initialize SecurePay UI Component
    var mySecurePayUI = new securePayUI.init({
      containerId: 'securepay-ui-container', // Matches the ID in HTML
      scriptId: 'securepay-ui-js',
      clientId: '0oaxb9i8P9vQdXTsn3l5', // Your client ID
      merchantCode: '5AR0055', // Your merchant code
      card: {
        allowedCardTypes: ['visa', 'mastercard'],
        showCardIcons: true,
        onCardTypeChange: function(cardType) {
          // card type has changed
        },
        onBINChange: function(cardBIN) {
          // card BIN has changed
        },
        onFormValidityChange: function(valid) {
          // form validity has changed
        },
        onTokeniseSuccess: function(tokenisedCard) {
          // card was successfully tokenised or saved card was successfully retrieved 
        },
        onTokeniseError: function(errors) {
          // tokenization failed
        }
    },
    style: {
      backgroundColor: 'rgba(135, 206, 250, 0.1)',
      label: {
        font: {
            family: 'Arial, Helvetica, sans-serif',
            size: '1.1rem',
            color: 'darkblue'
        }
      },
      input: {
       font: {
           family: 'Arial, Helvetica, sans-serif',
           size: '1.1rem',
           color: 'darkblue'
       }
     }  
    },
    onLoadComplete: function () {
      // the UI Component has successfully loaded and is ready to be interacted with
    }
  });
  
    // Handle payment submission
    document.getElementById('submit-button').addEventListener('click', function () {
      mySecurePayUI.tokenisedCard();
    });
  });
  