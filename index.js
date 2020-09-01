
$(document).ready( () => {

  // Telephone number must conform to this pattern
  $('#tel').mask('(000) 000-0000');

  // add all states programmaticaly to the select tag
  const states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
  $.each(states, (index, state) => {
    $('#states').append(`<option value="${state}">${state}</option>`);
  });

  // when either checkbox is clicked, clear checkboxes and then add the attr to original target
  $(".checkbox").change(function() {
    $(".checkbox").prop('checked', false);
    $(this).prop('checked', true);
  });

  // submit form
  $('#submit').click( e => {
    e.preventDefault();
    // if validated, make request
    if(validate()) request();
    else return;

  });

  // clear out all input fields when cancel button is clicked
  $('#cancel').click( e => {
    e.preventDefault();
    $('input').each( (index, input) => input.value = "" );
    $('select option[value=""]').prop('selected', true);
  });

});

const request = () => {

  const payload = {
    token: "0AOJ70trwJ3mqPHK8DKQ9w",
    data: {
      employee_name: $('#name').val(),
      employee_number: $('#id').val(),
      phone: $('#tel').val(),
      address: $('#address').val(),
      city: $('#city').val(),
      zip: $('#zip').val(),
      state: $('#states').val(),
      // not using val() because this returns array of objs,
      // access 0th `value` value instead
      employed: $('.checkbox:checked')[0].value
    }
  }

  console.log(payload);

  $.ajax({
  type: "POST",
  url: "https://app.fakejson.com/q",
  data: payload
  })
  .then( res => {
    console.log('SUCCESS!');
    console.log(res);
  })
  .catch( err => {
    console.log('ERROR! :(');
    console.log(err)
  });

  console.log(`
EXAMPLE POST:
  $.post('/api/route', {
    employee_name: ${$('#name').val()},
    employee_number: ${$('#id').val()},
    phone: ${$('#tel').val()},
    address: ${$('#address').val()},
    city: ${$('#city').val()},
    zip: ${$('#zip').val()},
    state: ${$('#states').val()},
    employed: ${$('.checkbox:checked')[0].value}
  }).then( res => console.log(res) );
    `);
}

const validate = () => {
  const inputs = $('input');

  // validate input fields 0-5
  for(let i = 0; i <= 5; i++) {
    if(inputs[i].value === "") {
      alert('Please fill out all fields!');
      return false;
    }
  }

  // check that either checkbox is selected
  if(inputs[6].checked === false && inputs[7].checked === false) {
    alert('Please fill out all fields!');
    return false;
  }

  // check that the select statement is selected
  if( !($('select').val()) ) {
    alert('Please fill out all fields!');
    return false;
  }

  return true;

}
