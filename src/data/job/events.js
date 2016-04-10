
import common from 'jsCommon';


const EVENT = common.data.EVENT;
const definer = common.util.definer;


export class JOB_CREATE_SUCCEEDED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'JOB_CREATE_SUCCEEDED'
    );    
  }
}


export class JOB_CREATE_FAILED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'JOB_CREATE_FAILED'
    );    
  }
}


export class JOB_DELETE_SUCCEEDED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'JOB_DELETE_SUCCEEDED'
    );    
  }
}


export class JOB_DELETE_FAILED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'JOB_DELETE_FAILED'
    );    
  }
}


export class JOB_UPDATE_SUCCEEDED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'JOB_UPDATE_SUCCEEDED'
    );    
  }
}


export class JOB_UPDATE_FAILED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'JOB_UPDATE_FAILED'
    );    
  }
}


export class JOB_READ_SUCCEEDED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'JOB_READ_SUCCEEDED'
    );    
  }
}


export class JOB_READ_FAILED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'JOB_READ_FAILED'
    );    
  }
}


export class UNKNOWN_JOB_EVENT_RECEIVED extends EVENT {
  constructor(options) {
    super(options);
    /*
     * event id
     */
    definer.public.readonly(this,
      'eventType', 'UNKNOWN_JOB_EVENT_RECEIVED'
    );    
  }
}
