<template>
  <div class="wrapper">
		<main-master-page class="main-master">
			<div>
				<video-component class="video"/>
			</div>	
			<div>
				<my-shop-manager class="my-shop"/>
			</div>
			<div class="gentle-touch-component">
				<gentle-touch/>
			</div>
			<div class="our-mission-component">
				<our-mission/>
			</div>
			
			
		</main-master-page>
		
  </div>
</template>

<script>

import VideoComponent from '../components/VideoComponent.vue';
import MainMasterPage from '../masterpages/MainMasterPage.vue';
import MyShopManager from '../components/My Shop/MyShopManager.vue';
import GentleTouch from '../components/GentleTouch.vue';
import OurMission from '../components/OurMission.vue';


export default {
  name: "HomeView",
  components: { MainMasterPage, VideoComponent,  MyShopManager, GentleTouch, OurMission},
};
</script>
<style lang="scss" scoped>
.wrapper{

}
.main-master{
	display: flex;
	flex-direction: column;

}
.video{

	//margin-bottom: 50px;
	width: 100%;
}
.my-shop{
	//position: relative;
	margin-bottom: 10px;

}
.gentle-touch-component{
	//position: absolute;
	width: 100%;
	left: 0;
	flex: 1 1 auto;
}
.our-mission-component{
	width: 100%;
	background-color: rgb(116, 148, 122);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>