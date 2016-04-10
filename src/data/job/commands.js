
import common from 'jsCommon';


const COMMAND = common.data.COMMAND;
const definer = common.util.definer;


export class JOB_CREATE_REQUESTED extends COMMAND {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'JOB_CREATE_REQUESTED'
    );    
  }
}

export class JOB_DELETE_REQUESTED extends COMMAND {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'JOB_DELETE_REQUESTED'
    );    
  }
}

export class JOB_UPDATE_REQUESTED extends COMMAND {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'JOB_UPDATE_REQUESTED'
    );    
  }
}

export class JOB_READ_REQUESTED extends COMMAND {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'JOB_READ_REQUESTED'
    );    
  }
}
