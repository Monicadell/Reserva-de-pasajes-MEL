<template>
  <div>
    <svg v-if="type == 'symbol'" class="simbolSeat" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;" xml:space="preserve">
      <path d="M87.7,12.5c-0.8-3.7-4.1-6.6-8.2-6.6H36.9c-4,0-7.4,2.8-8.2,6.5h-17C8,12.5,5,15.4,5,19.1v61.7c0,3.7,3,6.6,6.7,6.6h16.9  c0.7,3.9,4.1,6.8,8.2,6.8h42.7c3.8,0,7-2.5,8-5.8c4.2-0.4,7.5-3.9,7.5-8.2V20.6C95,16.5,91.8,13,87.7,12.5z M36.9,8.8h42.7  c2.5,0,4.5,1.6,5.2,3.8c-3.3,0.8-5.8,3.5-6.3,6.8H36.9c-3,0-5.4-2.4-5.4-5.3S33.9,8.8,36.9,8.8z M28.7,84.5h-17  c-2.1,0-3.8-1.7-3.8-3.7V19.1c0-2.1,1.7-3.7,3.8-3.7h16.9c0.6,4,4.1,7,8.2,7h41.4v55.5H36.9C32.8,77.8,29.4,80.7,28.7,84.5z   M79.5,91.4H36.9c-3,0-5.4-2.4-5.4-5.3s2.4-5.3,5.4-5.3h41.5c0.2,3.6,2.8,6.5,6.2,7.4C83.7,90,81.8,91.4,79.5,91.4z M92.1,80.2  c0,2.9-2.4,5.3-5.4,5.3s-5.4-2.4-5.4-5.3V20.6c0-2.9,2.4-5.3,5.4-5.3s5.4,2.4,5.4,5.3V80.2z"/>
    </svg>

    <svg v-if="type == 'desktop'" class="seatSizeDesktop" :class="{selectedSeat: seatNumber === selectedNumber}" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;" xml:space="preserve">
      <path d="M87.7,12.5c-0.8-3.7-4.1-6.6-8.2-6.6H36.9c-4,0-7.4,2.8-8.2,6.5h-17C8,12.5,5,15.4,5,19.1v61.7c0,3.7,3,6.6,6.7,6.6h16.9  c0.7,3.9,4.1,6.8,8.2,6.8h42.7c3.8,0,7-2.5,8-5.8c4.2-0.4,7.5-3.9,7.5-8.2V20.6C95,16.5,91.8,13,87.7,12.5z M36.9,8.8h42.7  c2.5,0,4.5,1.6,5.2,3.8c-3.3,0.8-5.8,3.5-6.3,6.8H36.9c-3,0-5.4-2.4-5.4-5.3S33.9,8.8,36.9,8.8z M28.7,84.5h-17  c-2.1,0-3.8-1.7-3.8-3.7V19.1c0-2.1,1.7-3.7,3.8-3.7h16.9c0.6,4,4.1,7,8.2,7h41.4v55.5H36.9C32.8,77.8,29.4,80.7,28.7,84.5z   M79.5,91.4H36.9c-3,0-5.4-2.4-5.4-5.3s2.4-5.3,5.4-5.3h41.5c0.2,3.6,2.8,6.5,6.2,7.4C83.7,90,81.8,91.4,79.5,91.4z M92.1,80.2  c0,2.9-2.4,5.3-5.4,5.3s-5.4-2.4-5.4-5.3V20.6c0-2.9,2.4-5.3,5.4-5.3s5.4,2.4,5.4,5.3V80.2z"/>
      <text :class="{selectedSeat: seatNumber === selectedNumber}" class="seatText" x="20" y="63" fill="#000000" font-size="35px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">
        {{seatNumber}}
      </text>
    </svg>

    <svg v-if="type == 'mobile'" class="seatSizeMobile mobileSeat" :class="{selectedSeat: seatNumber === selectedNumber}" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;" xml:space="preserve">
      <path d="M87.7,12.5c-0.8-3.7-4.1-6.6-8.2-6.6H36.9c-4,0-7.4,2.8-8.2,6.5h-17C8,12.5,5,15.4,5,19.1v61.7c0,3.7,3,6.6,6.7,6.6h16.9  c0.7,3.9,4.1,6.8,8.2,6.8h42.7c3.8,0,7-2.5,8-5.8c4.2-0.4,7.5-3.9,7.5-8.2V20.6C95,16.5,91.8,13,87.7,12.5z M36.9,8.8h42.7  c2.5,0,4.5,1.6,5.2,3.8c-3.3,0.8-5.8,3.5-6.3,6.8H36.9c-3,0-5.4-2.4-5.4-5.3S33.9,8.8,36.9,8.8z M28.7,84.5h-17  c-2.1,0-3.8-1.7-3.8-3.7V19.1c0-2.1,1.7-3.7,3.8-3.7h16.9c0.6,4,4.1,7,8.2,7h41.4v55.5H36.9C32.8,77.8,29.4,80.7,28.7,84.5z   M79.5,91.4H36.9c-3,0-5.4-2.4-5.4-5.3s2.4-5.3,5.4-5.3h41.5c0.2,3.6,2.8,6.5,6.2,7.4C83.7,90,81.8,91.4,79.5,91.4z M92.1,80.2  c0,2.9-2.4,5.3-5.4,5.3s-5.4-2.4-5.4-5.3V20.6c0-2.9,2.4-5.3,5.4-5.3s5.4,2.4,5.4,5.3V80.2z"/>
      <text :class="{selectedSeat: seatNumber === selectedNumber}" class="seatText mobileSeat" x="-70" y="60" fill="#000000" font-size="35px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">
        {{seatNumber}}
      </text>
    </svg>

  </div>
</template>

<script>
  export default {
    props: ['seatNumber', 'selectedNumber', 'type']
  }
</script>

<style lang="stylus">
  button.seatBtn.btn div svg.seatSizeDesktop text.seatText {
    opacity: 1;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  .v-btn--floating .v-btn__content :not(:only-child):last-child {
    opacity: 1 !important;
    -webkit-transform: rotate(0deg) !important;
    transform: rotate(0deg) !important;
  }
  svg.selectedSeat {
    fill: #fff
  }

  text.selectedSeat {
    fill: #fff
  }

  .mobileSeat {
    transform: rotate(90deg);
  }

  button.seatBtn.btn div svg.seatSizeMobile text.seatText.mobileSeat {
    opacity: 1;
    -webkit-transform: rotate(270deg);
    transform: rotate(270deg);
  }

  .seatSizeDesktop {
    width: 40px;
    // margin-top: 14px;
    fill: grey
  }

  .seatSizeMobile {
    width: 40px;
    margin-left: -10px;
    fill: grey
    margin-top: 5px;
  }

  button.corridorDesktop {
    border-top-style: dashed;
    border-bottom-style: dashed;
    width: 60px;
    min-width: 0px;
  }

  button.corridorMobile {
    border-left-style: dashed;
    border-right-style: dashed;
    width: 55px;
    height: 55px;
    min-width: 0px;
  }

  .simbolSeat {
    width: 30px;
    fill: #000
  }

</style>
