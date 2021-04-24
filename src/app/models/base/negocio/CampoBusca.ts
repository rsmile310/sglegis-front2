export class CampoBusca {
    public nomeCampo: string; //nome da coluna do json q sera retornado
    public labelCampo: string; //sera utilizado no placeholder do campo
    public maxLengthCampo: number; //tamanho maximo do campo
    public maskCampo: string; //mascara do campo
    public tipoCampo: string; //determina o tipo do campo, TEXTO ou DATA


    constructor(
        private _nomeCampo: string,
        private _labelCampo: string,
        private _maxLengthCampo: number,
        private _maskCampo: string,
        private _tipoCampo: string) {
        this.nomeCampo = _nomeCampo;
        this.labelCampo = _labelCampo;
        this.maskCampo = _maskCampo;
        this.tipoCampo = _tipoCampo;
        this.maxLengthCampo = _maxLengthCampo;
    }

}
