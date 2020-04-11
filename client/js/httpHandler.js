(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //client should fetch every 100ms or so
  //it will receive an array of directions
  //and it needs to call swimTeam.move() on all the directions in the data array that was sent in response to the get request
  //if they are valid directions (already checked upon receipt of direction)
  //starting from index 0 to the end

  //what format will I get the data in? we want an array
  // const fetch = (callback = () => {}) => {
  //   $.ajax({
  //     type: 'GET',
  //     url: serverUrl,
  //     //data: [], //added this, will probably need to fix
  //     //contentType: 'application/json', //FIX THIS AS WELL
  //     success: (data) => {
  //       //call swimTeam.move() on all the directions in the data array that was sent in response to the get request
  //       // SwimTeam.move(data) //swimteam.js
  //       callback(data);
  //       console.log(data);
  //       console.log('success');

  //     },
  //     error: (status) => {
  //       console.error('swimTeam: Failed to fetch messages', status);
  //     }
  //   });
  // }


  const fetchSwimCommands  = ()  => {
    $.ajax({
      type: 'GET',
      url: serverUrl, //+ '/background.jpg',
      //data: [], //added this, will probably need to fix
      //contentType: 'text',
      success: (data) => {
        //call swimTeam.move() on all the directions in the data array that was sent in response to the get request
        SwimTeam.move(data) //swimteam.js
        console.log(data);
        console.log('success');
        fetchSwimCommands();
      },
      error: (status) => {
      console.error('swimTeam: Failed to fetch messages', status);
      fetchSwimCommands();
      }
    });
  }

  const fetchBackgroundImage  = ()  => {
    $.ajax({
      type: 'GET',
      url: serverUrl + '/background.jpg',
      //data: [], //added this, will probably need to fix
      //contentType: 'text',
      success: (data) => {
        console.log(data);
        console.log('success');
        //write it to a file in the client's main directory
        //update the background to that image
      },
      error: (status) => {
      console.error('swimTeam: Failed to fetch background image', status);

      }
    });
  }




  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  //this is for storing the image file in the server
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

  //fetchSwimCommands();
  fetchBackgroundImage();

  //initialize fetching here using setInterval
  //the callback function should call swimTeam.move() on every direction in the messages array returned from the get request

})();

//why is this file just a function just wrapped in parenthesis? -- means it will be executed immediately
//does this file need to be included in index.html? -- yes
//
