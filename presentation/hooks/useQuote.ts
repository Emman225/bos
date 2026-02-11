import { useAppContext } from '../context/AppProvider';

export function useQuote() {
  const {
    quotes, refreshQuotes, submitQuote, updateQuoteStatus,
    quoteItems, addToQuote, removeFromQuote, updateItemQuantity, clearCart,
    showNotification,
  } = useAppContext();

  const addToQuoteWithNotification = (product: { id: string; name: string } & Record<string, any>) => {
    addToQuote(product as any);
    showNotification(`${product.name} ajouté au devis.`);
  };

  const submitQuoteWithNotification = async (customer: any, notes?: string) => {
    try {
      await submitQuote(quoteItems, customer, notes);
      showNotification("Votre demande de devis a été envoyée !");
    } catch (error: unknown) {
      showNotification("Erreur lors de l'envoi du devis.", 'error');
      throw error;
    }
  };

  return {
    quotes, refreshQuotes, updateQuoteStatus,
    quoteItems, addToQuote: addToQuoteWithNotification, removeFromQuote, updateItemQuantity, clearCart,
    submitQuote: submitQuoteWithNotification,
  };
}
