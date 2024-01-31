<template>
	<div class="our-mission___container">
		<h2 >{{$t('ourMission.title')}}</h2>
		<p >{{$t('ourMission.paragraph1')}}</p>
		<p>{{$t('ourMission.paragraph2')}}</p>
	</div>
</template>

<script>
	export default {
		name:'OurMission'
	}
</script>

<style lang="scss" scoped>
.our-mission {

	// .our-mission___container

	&___container {
		font-size: 18px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: white;
		text-transform: capitalize;
		gap: 20px;
		width: 100%;
		padding: 60px;
		@media (max-width: 767.98px) {
			padding: 10px 10px;
			
		}
		@media (max-width: 530px) {
			padding: 10px 0px ;
			
		}
	}
	
}
h2{
	font-size: 28px;
	
}
p{
	padding: 0px 60px 0px 60px;
	text-align: center;
	line-height: 1.5;

}
</style>