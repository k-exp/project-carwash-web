
import common from 'jsCommon';


const EVENT = common.data.EVENT;
const definer = common.util.definer;


export class CUSTOMER_CREATE_SUCCEEDED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'CUSTOMER_CREATE_SUCCEEDED'
    );    
  }
}


export class CUSTOMER_CREATE_FAILED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'CUSTOMER_CREATE_FAILED'
    );    
  }
}


export class CUSTOMER_DELETE_SUCCEEDED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'CUSTOMER_DELETE_SUCCEEDED'
    );    
  }
}


export class CUSTOMER_DELETE_FAILED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'CUSTOMER_DELETE_FAILED'
    );    
  }
}


export class CUSTOMER_UPDATE_SUCCEEDED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'CUSTOMER_UPDATE_SUCCEEDED'
    );    
  }
}


export class CUSTOMER_UPDATE_FAILED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'CUSTOMER_UPDATE_FAILED'
    );    
  }
}


export class CUSTOMER_READ_SUCCEEDED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'CUSTOMER_READ_SUCCEEDED'
    );    
  }
}


export class CUSTOMER_READ_FAILED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'CUSTOMER_READ_FAILED'
    );    
  }
}


export class UNKNOWN_CUSTOMER_EVENT_RECEIVED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * event id
     */
    definer.public.readonly(this,
      'eventType', 'UNKNOWN_CUSTOMER_EVENT_RECEIVED'
    );    
  }
}
