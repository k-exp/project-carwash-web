
import common from 'jsCommon';


const COMMAND = common.data.COMMAND;
const definer = common.util.definer;


export class USER_CREATE_REQUESTED extends COMMAND {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'USER_CREATE_REQUESTED'
    );    
  }
}


export class USER_UPDATE_REQUESTED extends COMMAND {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'USER_UPDATE_REQUESTED'
    );    
  }
}


export class USER_DELETE_REQUESTED extends COMMAND {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'USER_DELETE_REQUESTED'
    );    
  }
}


export class USER_READ_REQUESTED extends COMMAND {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'USER_READ_REQUESTED'
    );    
  }
}


export class USER_SAFEREAD_REQUESTED extends COMMAND {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'USER_SAFEREAD_REQUESTED'
    );    
  }
}


export class USER_PASSWORD_RESET_REQUESTED extends COMMAND {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'USER_PASSWORD_RESET_REQUESTED'
    );    
  }
}


export class USER_VALIDATION_REQUESTED extends COMMAND {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'USER_VALIDATION_REQUESTED'
    );    
  }
}

module.exports = {
  USER_CREATE_REQUESTED: USER_CREATE_REQUESTED,
  USER_UPDATE_REQUESTED: USER_UPDATE_REQUESTED,
  USER_DELETE_REQUESTED: USER_DELETE_REQUESTED,
  USER_READ_REQUESTED: USER_READ_REQUESTED,
  USER_SAFEREAD_REQUESTED: USER_SAFEREAD_REQUESTED,
  USER_PASSWORD_RESET_REQUESTED: USER_PASSWORD_RESET_REQUESTED,
  USER_VALIDATION_REQUESTED: USER_VALIDATION_REQUESTED
};
