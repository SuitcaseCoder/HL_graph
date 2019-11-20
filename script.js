var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['0', '1', '2', '3', '4', '5', '6','7'],
        datasets: [{
            // label: 'Con Lucas. % Acumulado con el pago del Alquiler',
            label: "euros", 
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [5.0, 6.7, 8.3, 10.0, 11.5, 12.9, 14.3, 15.7]
          }]
    },

    // Configuration options go here
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
            display: true,
            ticks: {
              max: 120000,
              min: 0
                // suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                // OR //
                // beginAtZero: true   // minimum value will be 0.
            }
        }]
      },
      title: {
        display: true,
        text: 'Con Lucas. % Acumulado con el pago del Alquiler'
      },

    }
});


function calculator(){
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
   });
  
   let inputVal = Number(document.getElementById('input-calculator').value);


   let textInput = Number(document.getElementById('inputVal').value);

   
   let initialInversion = Math.round(inputVal*0.05);

   let rentAnnual = Math.round(inputVal*0.045);

   let rentMonth = Math.round(rentAnnual/12);

   let buyerPriceY3 = Math.round(inputVal*(1+0.015*3));

   let creditAnnual = buyerPriceY3*0.01665;
  //  console.log(creditAnnual + ' credit annual defined');

   let inversionMonth = Math.round(creditAnnual/12);

   let permanenciaMinima = 3;

  //  document.getElementById('input-calculator').value = formatter.format(Number(inputVal));
   
   document.getElementById('initialInversion').innerHTML=formatter.format(initialInversion);
   document.getElementById('alquilerMensual').innerHTML=formatter.format(rentMonth);
   document.getElementById('monthlyInversion').innerHTML=formatter.format(inversionMonth);
   document.getElementById('minRental').innerHTML=permanenciaMinima + ' a&ntilde;os';

setUpGraph(creditAnnual, buyerPriceY3);
};

function calculator2(){
//Set Currency
var GBP = {
 mask: '£num',
 blocks: {
   num: {
     mask: Number,
     thousandsSeparator: ','
   }
 }
}
//Set Mask
var masked = IMask.createMask(GBP);
};


// listen onchange updates slider position then fire calculator 
function listenTextChange(textInput){
  $("input[type='text']").change(function(){
      textInput = $("input[type='text']").val();
      $("input[type='range']").val(textInput);
      $("input[type='range']").trigger('change');
      // chart.update();
  })

}


function onSub(){
  $("input[type='range']").change(function() {
    calculator();
    calculator2();
    })
}


function setUpGraph(creditAnnual, buyerPriceY3){
  var yZeroTenantEquity = Math.round(0.05 * buyerPriceY3);
  var tenantEquityYears = [];

  for(let i=0; i<=7; i++){
    tenantEquityYears.push(Math.round(yZeroTenantEquity + creditAnnual * i));
  } 

  console.log(chart.data.datasets[0].data);
  console.log(tenantEquityYears);
  chart.data.datasets[0].data.splice(0,8);
  console.log('should be empty:  ' + chart.data.datasets[0].data);
  for(let i=0; i<tenantEquityYears.length; i++){
    // chart.data.datasets[0].data.splice(0,8, tenantEquityYears[i] );
    chart.data.datasets[0].data.push(tenantEquityYears[i]);
    // console.log('num getting pushed to data array:  ' + chart.data.datasets[0].data);
  }

  console.log('should be array of new numbers: ' + chart.data.datasets[0].data);

  chart.update();
};

console.log();


listenTextChange();
onSub();