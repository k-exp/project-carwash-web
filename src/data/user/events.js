
import common from 'jsCommon';


const EVENT = common.data.EVENT;
const definer = common.util.definer;


export class USER_CREATE_SUCCEEDED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * event id
     */
    definer.public.readonly(this,
      'eventType', 'USER_CREATE_SUCCEEDED'
    );    
  }
}


export class USER_CREATE_FAILED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * event id
     */
    definer.public.readonly(this,
      'eventType', 'USER_CREATE_FAILED'
    );    
  }
}


export class USER_UPDATE_SUCCEEDED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * event id
     */
    definer.public.readonly(this,
      'eventType', 'USER_UPDATE_SUCCEEDED'
    );    
  }
}


export class USER_UPDATE_FAILED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * event id
     */
    definer.public.readonly(this,
      'eventType', 'USER_UPDATE_FAILED'
    );    
  }
}


export class USER_DELETE_SUCCEEDED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * event id
     */
    definer.public.readonly(this,
      'eventType', 'USER_DELETE_SUCCEEDED'
    );    
  }
}


export class USER_DELETE_FAILED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * event id
     */
    definer.public.readonly(this,
      'eventType', 'USER_DELETE_FAILED'
    );    
  }
}


export class USER_READ_SUCCEEDED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * event id
     */
    definer.public.readonly(this,
      'eventType', 'USER_READ_SUCCEEDED'
    );    
  }
}


export class USER_READ_FAILED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * event id
     */
    definer.public.readonly(this,
      'eventType', 'USER_READ_FAILED'
    );    
  }
}


export class USER_SAFEREAD_SUCCEEDED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * event id
     */
    definer.public.readonly(this,
      'eventType', 'USER_SAFEREAD_SUCCEEDED'
    );    
  }
}


export class USER_SAFEREAD_FAILED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * event id
     */
    definer.public.readonly(this,
      'eventType', 'USER_SAFEREAD_FAILED'
    );    
  }
}


export class USER_PASSWORD_RESET_SUCCEEDED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * event id
     */
    definer.public.readonly(this,
      'eventType', 'USER_PASSWORD_RESET_SUCCEEDED'
    );    
  }
}


export class USER_PASSWORD_RESET_FAILED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * event id
     */
    definer.public.readonly(this,
      'eventType', 'USER_PASSWORD_RESET_FAILED'
    );    
  }
}


export class USER_VALIDATION_SUCCEEDED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * event id
     */
    definer.public.readonly(this,
      'eventType', 'USER_VALIDATION_SUCCEEDED'
    );    
  }
}


export class USER_VALIDATION_FAILED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * event id
     */
    definer.public.readonly(this,
      'eventType', 'USER_VALIDATION_FAILED'
    );    
  }
}


export class UNKNOWN_USER_EVENT_RECEIVED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * event id
     */
    definer.public.readonly(this,
      'eventType', 'UNKNOWN_USER_EVENT_RECEIVED'
    );    
  }
}

/*
 * EXPORTS
 */
module.exports = {
  USER_CREATE_SUCCEEDED: USER_CREATE_SUCCEEDED,
  USER_CREATE_FAILED: USER_CREATE_FAILED,
  USER_UPDATE_SUCCEEDED: USER_UPDATE_SUCCEEDED,
  USER_UPDATE_FAILED: USER_UPDATE_FAILED,
  USER_DELETE_SUCCEEDED: USER_DELETE_SUCCEEDED,
  USER_DELETE_FAILED: USER_DELETE_FAILED,
  USER_READ_SUCCEEDED: USER_READ_SUCCEEDED,
  USER_READ_FAILED: USER_READ_FAILED,
  USER_SAFEREAD_SUCCEEDED: USER_SAFEREAD_SUCCEEDED,
  USER_SAFEREAD_FAILED: USER_SAFEREAD_FAILED,
  USER_PASSWORD_RESET_SUCCEEDED: USER_PASSWORD_RESET_SUCCEEDED,
  USER_PASSWORD_RESET_FAILED: USER_PASSWORD_RESET_FAILED,
  USER_VALIDATION_SUCCEEDED: USER_VALIDATION_SUCCEEDED,
  USER_VALIDATION_FAILED: USER_VALIDATION_FAILED,
  UNKNOWN_USER_EVENT_RECEIVED: UNKNOWN_USER_EVENT_RECEIVED
};
