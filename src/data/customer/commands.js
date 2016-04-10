
import common from 'jsCommon';


const COMMAND = common.data.COMMAND;
const definer = common.util.definer;


export class CUSTOMER_CREATE_REQUESTED extends COMMAND {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'CUSTOMER_CREATE_REQUESTED'
    );    
  }
}

export class CUSTOMER_DELETE_REQUESTED extends COMMAND {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'CUSTOMER_DELETE_REQUESTED'
    );    
  }
}

export class CUSTOMER_UPDATE_REQUESTED extends COMMAND {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'CUSTOMER_UPDATE_REQUESTED'
    );    
  }
}

export class CUSTOMER_READ_REQUESTED extends COMMAND {
  constructor(options) {
    super(options);
    /*
     * command id
     */
    definer.public.readonly(this,
      'commandType', 'CUSTOMER_READ_REQUESTED'
    );    
  }
}
