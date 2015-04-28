import Ember from 'ember';
import _ from 'lodash';

export default Ember.Component.extend({
  member_name: '',
  member_value: '',
  memberAlert: '',
  showAlert: false,
  members: Ember.A(),
  actions: {
    addMember: function () {
      var self = this;
      self.set('memberAlert','');
      self.set('showAlert',false);

      var members = this.get('members');
      if(_.any(members,'member_name',this.get('member_name'))){
        self.set('memberAlert','A custom value with that key already exists');
        self.set('showAlert',true);
        return;
      }
      var member = {};
      var member_name = this.get('member_name');
      var member_value = this.get('member_value');
      if(member_name && member_value) {
        member.member_name = member_name;
        try{
          member.member_value = JSON.parse(member_value);
        }
        catch(e){
          if(/Unexpected token.*/.test(e.message)){
            self.set('memberAlert','There was a problem parsing the value.  Make sure it is valid JSON');
            self.set('showAlert',true);
            return;
          }
        }
        members.pushObject(member);
        this.sendAction('action', 'add', member);
        self.set('member_name', '');
        self.set('member_value', '');
      }
    },
    removeMember: function(member){
      var members = this.get('members');
      members.removeObject(member);
      this.sendAction('action', 'remove', member);
    }
  }
});
