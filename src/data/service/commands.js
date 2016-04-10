
import common from 'jsCommon';


const COMMAND = common.data.COMMAND;
const definer = common.util.definer;


export class SERVICE_CREATE_REQUESTED extends COMMAND {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'SERVICE_CREATE_REQUESTED'
    );    
  }
}

export class SERVICE_DELETE_REQUESTED extends COMMAND {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'SERVICE_DELETE_REQUESTED'
    );    
  }
}

export class SERVICE_UPDATE_REQUESTED extends COMMAND {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'SERVICE_UPDATE_REQUESTED'
    );    
  }
}

export class SERVICE_READ_REQUESTED extends COMMAND {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'SERVICE_READ_REQUESTED'
    );    
  }
}
