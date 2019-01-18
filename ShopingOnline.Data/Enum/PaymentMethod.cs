using System.ComponentModel;

namespace ShoppingOnline.Data.Enum
{
    public enum PaymentMethod
    {
        [Description("Thanh toán khi giao hàng")]
        CashOnDelivery,

        [Description("Chuyển khoản trực tuyến")]
        OnlinBanking,

        [Description("Cổng thanh toán ngân lượng")]
        PaymentGateway,

        [Description("Visa")]
        Visa,

        [Description("Master Card")]
        MasterCard,

        [Description("PayPal")]
        PayPal,

        [Description("Chuyển khoản ngân hàng")]
        Atm
    }
}