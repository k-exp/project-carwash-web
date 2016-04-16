
import common from 'jsCommon';


const EVENT = common.data.EVENT;
const definer = common.util.definer;


export class SERVICE_CREATE_SUCCEEDED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'eventType', 'SERVICE_CREATE_SUCCEEDED'
    );    
  }
}


export class SERVICE_CREATE_FAILED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'eventType', 'SERVICE_CREATE_FAILED'
    );    
  }
}


export class SERVICE_DELETE_SUCCEEDED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'eventType', 'SERVICE_DELETE_SUCCEEDED'
    );    
  }
}


export class SERVICE_DELETE_FAILED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'eventType', 'SERVICE_DELETE_FAILED'
    );    
  }
}


export class SERVICE_UPDATE_SUCCEEDED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'eventType', 'SERVICE_UPDATE_SUCCEEDED'
    );    
  }
}


export class SERVICE_UPDATE_FAILED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'eventType', 'SERVICE_UPDATE_FAILED'
    );    
  }
}


export class SERVICE_READ_SUCCEEDED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'eventType', 'SERVICE_READ_SUCCEEDED'
    );    
  }
}


export class SERVICE_READ_FAILED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'eventType', 'SERVICE_READ_FAILED'
    );    
  }
}


export class UNKNOWN_SERVICE_EVENT_RECEIVED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * event id
     */
    definer.public.readonly(this,
      'eventType', 'UNKNOWN_SERVICE_EVENT_RECEIVED'
    );    
  }
}
