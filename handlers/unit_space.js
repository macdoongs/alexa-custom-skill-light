
/***********
 modules
********* */
const config = require("config.json")("./config/config.json");

const unitSpaceCTRL = require('../controllers/unit_space/index');

const constants = require('../lib/constants');


module.exports = {
  'CreateUnitSpace': function () {
    console.log("CreateUnitSpace");

    var key = constants.TABLE_USER_GATEWAY;
    const gatewayObject = this.attributes[key];

    if(gatewayObject === undefined){
      const speechOutput = "First, you must discover your gateway!";
      this.response.speak(speechOutput);
      this.response.cardRenderer(global.APP_NAME, speechOutput, constants.BACKGROUND_IMAGE);

      this.emit(':responseReady');
    }else{
      const uSpaceName = this.event.request.intent.slots.uSpaceName.value;

      unitSpaceCTRL.createUnitSpace(gatewayObject, uSpaceName, (function(error, resultObject){
        var key = constants.TABLE_USER_UNIT_SPACE_PREFIX + uSpaceName;
        var value = resultObject.data.uSpaceId;



        const speechOutput = 'Create unit space ' + uSpaceName + "!";

        this.response.speak(speechOutput);

        this.attributes[key] = value;

        this.emit(':saveState', true);
      }).bind(this));
    }
  },// CreateUnitSpace
  'LoadUnitSpaceList': function () {
    console.log("LoadUnitSpaceList");

    var key = constants.TABLE_USER_GATEWAY;
    const gatewayObject = this.attributes[key];

    if(gatewayObject === undefined){
      const speechOutput = "First, you must discover your gateway!";
      this.response.speak(speechOutput);
      this.response.cardRenderer(global.APP_NAME, speechOutput, constants.BACKGROUND_IMAGE);

      this.emit(':responseReady');
    }else{
      unitSpaceCTRL.loadUnitSpaceList(gatewayObject, (function(error, resultObject){
        this.response.speak('Load unitspaces!' + JSON.stringify(resultObject.data.uSpaceList));

        var key = constants.TABLE_USER_UNIT_SPACE_LIST;
        var value = resultObject.data.uSpaceList;

        this.attributes[key] = value;

        this.emit(':saveState', true);
      }).bind(this));
    }
  },// LoadUnitSpaceList
  'RemoveUnitSpace': function () {
    console.log("RemoveUnitSpace");

    var key = constants.TABLE_USER_GATEWAY;
    const gatewayObject = this.attributes[key];

    if(gatewayObject === undefined){
      const speechOutput = "First, you must discover your gateway!";
      this.response.speak(speechOutput);
      this.response.cardRenderer(global.APP_NAME, speechOutput, constants.BACKGROUND_IMAGE);

      this.emit(':responseReady');
    }else{
      const uSpaceName = this.event.request.intent.slots.uSpaceName.value;

      var key = constants.TABLE_USER_UNIT_SPACE_PREFIX + uSpaceName;

      var uSpaceId = this.attributes[key];

      unitSpaceCTRL.removeUnitSpace(uSpaceId, (function(error, resultObject){

        var key = constants.TABLE_USER_UNIT_SPACE_LIST;
        var unitSpaceList = this.attributes[key];

        console.log(key, unitSpaceList);

        var key = constants.TABLE_USER_UNIT_SPACE_PREFIX + uSpaceName;
        var uSpaceId = this.attributes[key];

        console.log(key, uSpaceId);

        delete this.attributes[key];

        this.response.speak(`Remove unit space ${uSpaceId}!`);
        this.emit(':saveState', true);
      }).bind(this));
    }
  },// RemoveUnitSpace
  'AddLightToUnitSpace': function () {
    console.log("AddLightToUnitSpace");

    this.response.speak('Add light to unit space!');
    this.emit(':responseReady');
  },// AddLightToUnitSpace
  'AddGroupToUnitSpace': function () {
    console.log("AddGroupToUnitSpace");

    this.response.speak('Add group to unit space!');
    this.emit(':responseReady');
  },// AddGroupToUnitSpace
  'LoadLightListFromUnitSpace': function () {
    console.log("LoadLightListFromUnitSpace");

    var key = constants.TABLE_USER_GATEWAY;
    const gatewayObject = this.attributes[key];

    if(gatewayObject === undefined){
      const speechOutput = "First, you must discover your gateway!";
      this.response.speak(speechOutput);
      this.response.cardRenderer(global.APP_NAME, speechOutput, constants.BACKGROUND_IMAGE);

      this.emit(':responseReady');
    }else{
      const uSpaceName = this.event.request.intent.slots.uSpaceName.value;

      var key = constants.TABLE_USER_UNIT_SPACE_PREFIX + uSpaceName;

      var uSpaceId = this.attributes[key];

      unitSpaceCTRL.loadLightListFromUnitSpace(gatewayObject, uSpaceId, (function(error, resultObject){
        var deviceList = resultObject.data.deviceList;

        var listName = "";

        // temp data
        for(var i=0; i<deviceList.length; i++){
          listName += " Light " + deviceList[i].did;
        }

        this.response.speak(`Load light from unit space ${uSpaceName}! Light List : ${listName}`);
        this.emit(':responseReady');
      }).bind(this));
    }
  },// LoadLightListFromUnitSpace
  'LoadGroupLightListFromUnitSpace': function () {
    console.log("LoadGroupLightListFromUnitSpace");

    var key = constants.TABLE_USER_GATEWAY;
    const gatewayObject = this.attributes[key];

    if(gatewayObject === undefined){
      const speechOutput = "First, you must discover your gateway!";
      this.response.speak(speechOutput);
      this.response.cardRenderer(global.APP_NAME, speechOutput, constants.BACKGROUND_IMAGE);

      this.emit(':responseReady');
    }else{
      const uSpaceName = this.event.request.intent.slots.uSpaceName.value;
      const groupId = this.event.request.intent.slots.groupId.value;

      var key = constants.TABLE_USER_UNIT_SPACE_PREFIX + uSpaceName;

      var uSpaceId = this.attributes[key];

      unitSpaceCTRL.loadGroupLightListFromUnitSpace(gatewayObject, groupId, uSpaceId, (function(error, resultObject){
        var deviceList = resultObject.data.deviceList;

        var listName = "";

        // temp data
        for(var i=0; i<deviceList.length; i++){
          listName += " Light " + deviceList[i].did;
        }

        this.response.speak(`Load light from unit space ${uSpaceId}! Light list : ${listName}`);
        this.emit(':responseReady');
      }).bind(this));
    }
  },// LoadGroupLightListFromUnitSpace
  'RemoveLightFromUnitSpace': function () {
    console.log("RemoveLightFromUnitSpace");

    var key = constants.TABLE_USER_GATEWAY;
    const gatewayObject = this.attributes[key];

    if(gatewayObject === undefined){
      const speechOutput = "First, you must discover your gateway!";
      this.response.speak(speechOutput);
      this.response.cardRenderer(global.APP_NAME, speechOutput, constants.BACKGROUND_IMAGE);

      this.emit(':responseReady');
    }else{
      const uSpaceName = this.event.request.intent.slots.uSpaceName.value;
      const lightId = this.event.request.intent.slots.lightId.value;

      var key = constants.TABLE_USER_UNIT_SPACE_PREFIX + uSpaceName;

      var uSpaceId = this.attributes[key];

      unitSpaceCTRL.removeLightFromUnitSpace(lightId, uSpaceId, (function(error, resultObject){


        this.response.speak(`Remove light ${lightId} from unit space ${uSpaceId}!`);
        this.emit(':responseReady');
      }).bind(this));
    }
  },// RemoveLightFromUnitSpace
  'RemoveGroupFromUnitSpace': function () {
    console.log("RemoveGroupFromUnitSpace");

    var key = constants.TABLE_USER_GATEWAY;
    const gatewayObject = this.attributes[key];

    if(gatewayObject === undefined){
      const speechOutput = "First, you must discover your gateway!";
      this.response.speak(speechOutput);
      this.response.cardRenderer(global.APP_NAME, speechOutput, constants.BACKGROUND_IMAGE);

      this.emit(':responseReady');
    }else{
      const uSpaceName = this.event.request.intent.slots.uSpaceName.value;
      const groupId = this.event.request.intent.slots.groupId.value;

      var key = constants.TABLE_USER_UNIT_SPACE_PREFIX + uSpaceName;

      var uSpaceId = this.attributes[key];

      unitSpaceCTRL.removeGroupFromUnitSpace(gatewayObject, groupId, uSpaceId, (function(error, resultObject){


        this.response.speak(`Remove group from unit space ${uSpaceId}!`);
        this.emit(':responseReady');
      }).bind(this));
    }
  }// RemoveGroupFromUnitSpace
};// UnitSpaceHandler
