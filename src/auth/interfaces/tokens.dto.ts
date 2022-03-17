
import { ApiModelProperty } from '@nestjs/swagger';

export class TokensDto {
    @ApiModelProperty()
    // tslint:disable-next-line: variable-name
    expires_in: number;

    @ApiModelProperty()
    // tslint:disable-next-line: variable-name
    access_token: string;

    @ApiModelProperty()
    // tslint:disable-next-line: variable-name
    refresh_token: string;
}
