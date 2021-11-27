class AddressController {
    constructor(AddressModel) {
        this.address = AddressModel;
    }

    async create(addressData) {
        return await this.address.create(addressData);
    }

    async updateOrCreate(addressData) {
        const { id } = addressData;

        if(id){
            return await this.address.update(addressData, { where: { id: id } });
        }

        return this.create(addressData);
    }
}

module.exports = AddressController;