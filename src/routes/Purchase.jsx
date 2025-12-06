import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

function Purchase() {
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        defaultValues: {
            ShowId: Number(id) || 0,
            TicketSales: 1,
            Name: '',
            Email: '',
            PaymentType: 'Card',
            CardNumber: '',
            ExpirationDate: '',
            CVV: ''
        }
    })

    const apiUrl = import.meta.env.VITE_SHOWS_API_URL
    const [result, setResult] = useState(null)

    const onSubmit = async (data) => {
        console.log(data)
        setResult(null)

        try {
            const payload = {
                ticketSales: Number(data.TicketSales),
                name: data.Name,
                email: data.Email,
                paymentType: data.PaymentType,
                cardNumber: data.CardNumber.replace(/\s+/g, ''),
                cvv: data.CVV ? Number(data.CVV) : null
            }

            const apiBaseClean = apiUrl ? apiUrl.replace(/\/$/, '') : apiUrl
            const endpoint = `${apiBaseClean}/${Number(data.ShowId)}/purchases`
            console.log('POSTing purchase to:', endpoint)

            const resp = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            const responseData = await resp.json().catch(() => null)

            if (resp.ok) {
                setResult({ success: true, message: responseData?.message || 'Purchase complete. Check your email for confirmation.' })
                reset()
            } else {
                setResult({ success: false, message: responseData?.error || responseData?.message || 'Purchase failed. Please try again.' })
            }
        } catch (err) {
            setResult({ success: false, message: 'Network error. Please try again later.' })
        }
    }

    return (
        <>
            <div className="container mt-4">
                <p><Link to={`/details/${id}`}>← Back to Event</Link></p>

                <h2>Purchase Tickets</h2>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="col-md-6">

                    <div className="form-group row mb-3">
                        <label htmlFor="ShowId" className="col-sm-4 col-form-label">Show ID</label>
                        <div className="col-sm-8">
                            <input type="number" className="form-control" {...register("ShowId", { required: "Show ID is required" })} readOnly />
                            {errors.ShowId && <div className="text-danger">{errors.ShowId.message}</div>}
                        </div>
                    </div>

                    <div className="form-group row mb-3">
                        <label htmlFor="TicketSales" className="col-sm-4 col-form-label">Number of Tickets</label>
                        <div className="col-sm-8">
                            <input type="number" className="form-control" min="1" {...register("TicketSales", { required: "Please order at least 1 ticket", min: { value: 1, message: "Minimum 1 ticket" } })} />
                            {errors.TicketSales && <div className="text-danger">{errors.TicketSales.message}</div>}
                        </div>
                    </div>

                    <fieldset className="form-group mb-3">
                        <legend className="col-form-label pt-0">Customer Details</legend>
                        <div className="form-group row mb-2">
                            <label htmlFor="Name" className="col-sm-4 col-form-label">Full name</label>
                            <div className="col-sm-8">
                                <input className="form-control" {...register("Name", { required: "Please enter your full name", minLength: { value: 2, message: "Name must be at least 2 characters" } })} />
                                {errors.Name && <div className="text-danger">{errors.Name.message}</div>}
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="Email" className="col-sm-4 col-form-label">Email</label>
                            <div className="col-sm-8">
                                <input type="email" className="form-control" {...register("Email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email" } })} />
                                {errors.Email && <div className="text-danger">{errors.Email.message}</div>}
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="form-group mb-3">
                        <legend className="col-form-label pt-0">Payment Details</legend>
                        <div className="form-group row mb-2">
                            <label htmlFor="PaymentType" className="col-sm-4 col-form-label">Payment Type</label>
                            <div className="col-sm-8">
                                <select className="form-control" {...register("PaymentType")}>
                                    <option value="Card">Card</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="CardNumber" className="col-sm-4 col-form-label">Card number</label>
                            <div className="col-sm-8">
                                <input className="form-control" placeholder="4242424242424242" {...register("CardNumber", { required: "Card number is required", pattern: { value: /^\d{16}$/, message: "Enter 16 digits" } })} />
                                {errors.CardNumber && <div className="text-danger">{errors.CardNumber.message}</div>}
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="ExpirationDate" className="col-sm-4 col-form-label">Expiry (MM/YY)</label>
                            <div className="col-sm-8">
                                <input className="form-control" placeholder="MM/YY" {...register("ExpirationDate", { required: "Expiry date is required", pattern: { value: /^\d{2}\/\d{2,4}$/, message: "Format: MM/YY or MM/YYYY" } })} />
                                {errors.ExpirationDate && <div className="text-danger">{errors.ExpirationDate.message}</div>}
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="CVV" className="col-sm-4 col-form-label">CVV</label>
                            <div className="col-sm-8">
                                <input className="form-control" placeholder="123" {...register("CVV", { required: "CVV is required", pattern: { value: /^\d{3,4}$/, message: "3 or 4 digits" } })} />
                                {errors.CVV && <div className="text-danger">{errors.CVV.message}</div>}
                            </div>
                        </div>
                    </fieldset>

                    <div className="form-group row">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Buy Tickets'}</button>
                    </div>
                </form>

                {result && (
                    <div className={result.success ? 'success' : 'error'}>
                        <p>{result.message}</p>
                        {result.success && <p>Next steps: check your email for a receipt and QR-coded tickets.</p>}
                    </div>
                )}
            </div>
        </>
    )
}

export default Purchase